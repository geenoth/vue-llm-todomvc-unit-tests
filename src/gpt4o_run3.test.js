import { mount } from "@vue/test-utils";
import TodoList from "./05_TodoList.vue";

describe("05_TodoList.vue", () => {
  const mockTodos = [
    { id: 1, title: "First Todo", completed: false },
    { id: 2, title: "Second Todo", completed: true },
  ];

  it("renders correctly with default props", () => {
    const wrapper = mount(TodoList, {
      props: { todos: [] },
    });
    const todoList = wrapper.get('[data-testid="TodoList"]');
    expect(todoList.exists()).toBe(true);
    expect(wrapper.findAll("li").length).toBe(0);
  });

  it("renders a list of todos", () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodos },
    });
    const todoItems = wrapper.findAll("li");
    expect(todoItems.length).toBe(2);

    const firstTodoLabel = wrapper.get('[data-testid="TodoLabel"]:nth-of-type(1)');
    expect(firstTodoLabel.text()).toBe("First Todo");

    const secondTodoLabel = wrapper.get('[data-testid="TodoLabel"]:nth-of-type(2)');
    expect(secondTodoLabel.text()).toBe("Second Todo");
  });

  it("handles checkbox `change` event and emits `toggle`", async () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodos },
    });
    const firstCheckbox = wrapper.findAll('[data-testid="TodoItemCheckbox"]')[0];
    await firstCheckbox.trigger("change");
    expect(wrapper.emitted("toggle")).toBeTruthy();
    expect(wrapper.emitted("toggle")[0]).toEqual([1]);
  });

  it("handles Destroy button click and emits `destroy`", async () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodos },
    });
    const firstDestroyButton = wrapper.findAll('[data-testid="DestroyButton"]')[0];
    await firstDestroyButton.trigger("click");
    expect(wrapper.emitted("destroy")).toBeTruthy();
    expect(wrapper.emitted("destroy")[0]).toEqual([1]);
  });

  it("handles label double-click and emits `edit`", async () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodos },
    });
    const firstLabel = wrapper.findAll('[data-testid="TodoLabel"]')[0];
    await firstLabel.trigger("dblclick");
    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit")[0]).toEqual([1]);
  });
});