import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import FilterLink_Completed from "./11_FilterLink_Completed.vue";

describe("FilterLink_Completed Component", () => {
  it("renders correctly when inactive", () => {
    const { getByTestId } = render(FilterLink_Completed, {
      props: { active: false },
    });

    const linkElement = getByTestId("FilterLink_Completed");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Completed");
    expect(linkElement).not.toHaveClass("selected");
  });

  it("renders correctly when active", () => {
    const { getByTestId } = render(FilterLink_Completed, {
      props: { active: true },
    });

    const linkElement = getByTestId("FilterLink_Completed");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Completed");
    expect(linkElement).toHaveClass("selected");
  });

  it("emits the 'select' event with 'completed' when clicked", async () => {
    const { getByTestId, emitted } = render(FilterLink_Completed);

    const linkElement = getByTestId("FilterLink_Completed");
    await fireEvent.click(linkElement);

    expect(emitted()["select"]).toBeTruthy();
    expect(emitted()["select"][0]).toEqual(["completed"]);
  });

  it("prevents default click behavior", async () => {
    const { getByTestId } = render(FilterLink_Completed);

    const preventDefault = jest.fn();
    const linkElement = getByTestId("FilterLink_Completed");
    await fireEvent.click(linkElement, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});