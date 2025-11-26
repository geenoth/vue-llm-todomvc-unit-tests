import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import FilterLink_Active from "./10_FilterLink_Active.vue";

describe("FilterLink_Active Component", () => {
  it("renders correctly when inactive", () => {
    const { getByTestId } = render(FilterLink_Active, {
      props: { active: false },
    });

    const linkElement = getByTestId("FilterLink_Active");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Active");
    expect(linkElement).not.toHaveClass("selected");
  });

  it("renders correctly when active", () => {
    const { getByTestId } = render(FilterLink_Active, {
      props: { active: true },
    });

    const linkElement = getByTestId("FilterLink_Active");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Active");
    expect(linkElement).toHaveClass("selected");
  });

  it("emits the 'select' event with 'active' when clicked", async () => {
    const { getByTestId, emitted } = render(FilterLink_Active);

    const linkElement = getByTestId("FilterLink_Active");
    await fireEvent.click(linkElement);

    expect(emitted()["select"]).toBeTruthy();
    expect(emitted()["select"][0]).toEqual(["active"]);
  });

  it("prevents default click behavior", async () => {
    const { getByTestId } = render(FilterLink_Active);

    const preventDefault = jest.fn();
    const linkElement = getByTestId("FilterLink_Active");
    await fireEvent.click(linkElement, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});