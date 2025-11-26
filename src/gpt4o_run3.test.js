import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import RemainingCounter from "./12_RemainingCounter.vue";

describe("RemainingCounter Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(RemainingCounter);

    const counterElement = getByTestId("RemainingCounter");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("0 items left");
  });

  it("renders correctly with a count of 1", () => {
    const { getByTestId } = render(RemainingCounter, {
      props: { count: 1 },
    });

    const counterElement = getByTestId("RemainingCounter");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("1 item left");
  });

  it("renders correctly with a count greater than 1", () => {
    const { getByTestId } = render(RemainingCounter, {
      props: { count: 5 },
    });

    const counterElement = getByTestId("RemainingCounter");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("5 items left");
  });

  it("renders correctly with a count of 0", () => {
    const { getByTestId } = render(RemainingCounter, {
      props: { count: 0 },
    });

    const counterElement = getByTestId("RemainingCounter");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("0 items left");
  });
});