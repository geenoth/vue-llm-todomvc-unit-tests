import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import DestroyButton from "./03_DestroyButton.vue";

describe("DestroyButton Component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(DestroyButton);

    const buttonElement = getByTestId("DestroyButton");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).toHaveAttribute("aria-label", "Delete");
    expect(buttonElement).toHaveTextContent("×");
  });

  it("emits the 'destroy' event when clicked", async () => {
    const { getByTestId, emitted } = render(DestroyButton);

    const buttonElement = getByTestId("DestroyButton");
    await fireEvent.click(buttonElement);

    expect(emitted()["destroy"]).toBeTruthy();
    expect(emitted()["destroy"]).toHaveLength(1);
  });
});