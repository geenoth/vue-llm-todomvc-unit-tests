import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import FilterLink_All from "./09_FilterLink_All.vue";

describe("FilterLink_All Component", () => {
  it("renders correctly when inactive", () => {
    const { getByTestId } = render(FilterLink_All, {
      props: { active: false },
    });

    const linkElement = getByTestId("FilterLink_All");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("All");
    expect(linkElement).not.toHaveClass("selected");
  });

  it("renders correctly when active", () => {
    const { getByTestId } = render(FilterLink_All, {
      props: { active: true },
    });

    const linkElement = getByTestId("FilterLink_All");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("All");
    expect(linkElement).toHaveClass("selected");
  });

  it("emits the 'select' event with 'all' when clicked", async () => {
    const { getByTestId, emitted } = render(FilterLink_All);

    const linkElement = getByTestId("FilterLink_All");
    await fireEvent.click(linkElement);

    expect(emitted()["select"]).toBeTruthy();
    expect(emitted()["select"][0]).toEqual(["all"]);
  });

  it("prevents default click behavior", async () => {
    const { getByTestId } = render(FilterLink_All);

    const preventDefault = jest.fn();
    const linkElement = getByTestId("FilterLink_All");
    await fireEvent.click(linkElement, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});