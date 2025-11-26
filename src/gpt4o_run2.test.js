import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import ClearCompletedButton from "./04_ClearCompletedButton.vue";

describe("ClearCompletedButton Component", () => {
  it("renders correctly when hasCompleted is false", () => {
    const { getByTestId } = render(ClearCompletedButton, {
      props: { hasCompleted: false },
    });

    const buttonElement = getByTestId("ClearCompletedButton");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).toHaveTextContent("Clear completed");
    expect(buttonElement).toBeDisabled();
  });

  it("renders correctly when hasCompleted is true", () => {
    const { getByTestId } = render(ClearCompletedButton, {
      props: { hasCompleted: true },
    });

    const buttonElement = getByTestId("ClearCompletedButton");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).toHaveTextContent("Clear completed");
    expect(buttonElement).not.toBeDisabled();
  });

  it("emits the 'clear' event when clicked and hasCompleted is true", async () => {
    const { getByTestId, emitted } = render(ClearCompletedButton, {
      props: { hasCompleted: true },
    });

    const buttonElement = getByTestId("ClearCompletedButton");
    await fireEvent.click(buttonElement);

    expect(emitted()["clear"]).toBeTruthy();
    expect(emitted()["clear"]).toHaveLength(1);
  });

  it("does not emit the 'clear' event when clicked and hasCompleted is false", async () => {
    const { getByTestId, emitted } = render(ClearCompletedButton, {
      props: { hasCompleted: false },
    });

    const buttonElement = getByTestId("ClearCompletedButton");
    await fireEvent.click(buttonElement);

    expect(emitted()["clear"]).toBeFalsy();
  });
});