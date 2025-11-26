import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import EditTodoInput from "./02_EditTodoInput.vue";

describe("EditTodoInput Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(EditTodoInput, {
      props: { modelValue: "", placeholder: "Edit todo" },
    });

    const inputElement = getByTestId("EditTodoInput");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("edit-todo-input");
    expect(inputElement).toHaveAttribute("placeholder", "Edit todo");
    expect(inputElement).toHaveValue("");
  });

  it("renders correctly with a provided modelValue", () => {
    const { getByTestId } = render(EditTodoInput, {
      props: { modelValue: "Test Todo" },
    });

    const inputElement = getByTestId("EditTodoInput");
    expect(inputElement).toHaveValue("Test Todo");
  });

  it("emits the 'save' and 'update:modelValue' events on Enter key press", async () => {
    const { getByTestId, emitted } = render(EditTodoInput, {
      props: { modelValue: "" },
    });

    const inputElement = getByTestId("EditTodoInput");
    await fireEvent.update(inputElement, "Updated Todo");
    await fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(emitted()["save"]).toBeTruthy();
    expect(emitted()["save"][0]).toEqual(["Updated Todo"]);

    expect(emitted()["update:modelValue"]).toBeTruthy();
    expect(emitted()["update:modelValue"][0]).toEqual(["Updated Todo"]);
  });

  it("emits the 'cancel' event on Escape key press", async () => {
    const { getByTestId, emitted } = render(EditTodoInput, {
      props: { modelValue: "Test Todo" },
    });

    const inputElement = getByTestId("EditTodoInput");
    await fireEvent.keyDown(inputElement, { key: "Escape", code: "Escape" });

    expect(emitted()["cancel"]).toBeTruthy();
  });

  it("emits the 'save' and 'update:modelValue' events on blur", async () => {
    const { getByTestId, emitted } = render(EditTodoInput, {
      props: { modelValue: "" },
    });

    const inputElement = getByTestId("EditTodoInput");
    await fireEvent.update(inputElement, "Updated Todo");
    await fireEvent.blur(inputElement);

    expect(emitted()["save"]).toBeTruthy();
    expect(emitted()["save"][0]).toEqual(["Updated Todo"]);

    expect(emitted()["update:modelValue"]).toBeTruthy();
    expect(emitted()["update:modelValue"][0]).toEqual(["Updated Todo"]);
  });
});