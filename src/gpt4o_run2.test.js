import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import TodoList from "./05_TodoList.vue";

describe("TodoList Component", () => {
  const sampleTodos = [
    { id: 1, title: "Test Todo 1", completed: false },
    { id: 2, title: "Test Todo 2", completed: true },
  ];

  it("renders correctly with no todos", () => {
    const { getByTestId, queryAllByTestId } = render(TodoList, {
      props: { todos: [] },
    });

    const todoList = getByTestId("TodoList");
    expect(todoList).toBeInTheDocument();
    expect(queryAllByTestId("TodoItemCheckbox")).toHaveLength(0);
    expect(queryAllByTestId("TodoLabel")).toHaveLength(0);
    expect(queryAllByTestId("DestroyButton")).toHaveLength(0);
  });

  it("renders correctly with todos", () => {
    const { getAllByTestId } = render(TodoList, {
      props: { todos: sampleTodos },
    });

    const checkboxes = getAllByTestId("TodoItemCheckbox");
    const labels = getAllByTestId("TodoLabel");
    const destroyButtons = getAllByTestId("DestroyButton");

    expect(checkboxes).toHaveLength(2);
    expect(labels).toHaveLength(2);
    expect(destroyButtons).toHaveLength(2);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    expect(labels[0]).toHaveTextContent("Test Todo 1");
    expect(labels[1]).toHaveTextContent("Test Todo 2");
  });

  it("emits 'toggle' event with the correct todo id when a checkbox is changed", async () => {
    const { getAllByTestId, emitted } = render(TodoList, {
      props: { todos: sampleTodos },
    });

    const checkboxes = getAllByTestId("TodoItemCheckbox");
    await fireEvent.click(checkboxes[0]);

    expect(emitted()["toggle"]).toBeTruthy();
    expect(emitted()["toggle"][0]).toEqual([1]);
  });

  it("emits 'edit' event with the correct todo id when a label is double-clicked", async () => {
    const { getAllByTestId, emitted } = render(TodoList, {
      props: { todos: sampleTodos },
    });

    const labels = getAllByTestId("TodoLabel");
    await fireEvent.dblClick(labels[1]);

    expect(emitted()["edit"]).toBeTruthy();
    expect(emitted()["edit"][0]).toEqual([2]);
  });

  it("emits 'destroy' event with the correct todo id when the destroy button is clicked", async () => {
    const { getAllByTestId, emitted } = render(TodoList, {
      props: { todos: sampleTodos },
    });

    const destroyButtons = getAllByTestId("DestroyButton");
    await fireEvent.click(destroyButtons[0]);

    expect(emitted()["destroy"]).toBeTruthy();
    expect(emitted()["destroy"][0]).toEqual([1]);
  });
});