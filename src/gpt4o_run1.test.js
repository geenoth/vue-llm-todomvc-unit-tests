import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import ToggleAllCheckbox from "./07_ToggleAllCheckbox.vue";

describe("ToggleAllCheckbox Component", () => {
  it("renders correctly when allChecked is false by default", () => {
    const { getByTestId } = render(ToggleAllCheckbox, {
      props: { allChecked: false },
    });

    const checkbox = getByTestId("ToggleAllCheckbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders correctly when allChecked is true", () => {
    const { getByTestId } = render(ToggleAllCheckbox, {
      props: { allChecked: true },
    });

    const checkbox = getByTestId("ToggleAllCheckbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("emits the 'toggleAll' event with the correct value when checked", async () => {
    const { getByTestId, emitted } = render(ToggleAllCheckbox, {
      props: { allChecked: false },
    });

    const checkbox = getByTestId("ToggleAllCheckbox");
    await fireEvent.click(checkbox);

    expect(emitted()["toggleAll"]).toBeTruthy();
    expect(emitted()["toggleAll"][0]).toEqual([true]);
  });

  it("emits the 'toggleAll' event with the correct value when unchecked", async () => {
    const { getByTestId, emitted } = render(ToggleAllCheckbox, {
      props: { allChecked: true },
    });

    const checkbox = getByTestId("ToggleAllCheckbox");
    await fireEvent.click(checkbox);

    expect(emitted()["toggleAll"]).toBeTruthy();
    expect(emitted()["toggleAll"][0]).toEqual([false]);
  });
});