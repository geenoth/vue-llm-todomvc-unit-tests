import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import TodoItemCheckbox from "./06_TodoItemCheckbox.vue";

describe("TodoItemCheckbox Component", () => {
  it("renders correctly when unchecked by default", () => {
    const { getByTestId } = render(TodoItemCheckbox, {
      props: { checked: false },
    });

    const checkbox = getByTestId("TodoItemCheckbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders correctly when checked", () => {
    const { getByTestId } = render(TodoItemCheckbox, {
      props: { checked: true },
    });

    const checkbox = getByTestId("TodoItemCheckbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("emits the 'change' event with the correct value when toggled to checked", async () => {
    const { getByTestId, emitted } = render(TodoItemCheckbox, {
      props: { checked: false },
    });

    const checkbox = getByTestId("TodoItemCheckbox");
    await fireEvent.click(checkbox);

    expect(emitted()["change"]).toBeTruthy();
    expect(emitted()["change"][0]).toEqual([true]);
  });

  it("emits the 'change' event with the correct value when toggled to unchecked", async () => {
    const { getByTestId, emitted } = render(TodoItemCheckbox, {
      props: { checked: true },
    });

    const checkbox = getByTestId("TodoItemCheckbox");
    await fireEvent.click(checkbox);

    expect(emitted()["change"]).toBeTruthy();
    expect(emitted()["change"][0]).toEqual([false]);
  });
});