import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import TodoLabel from "./08_TodoLabel.vue";

describe("TodoLabel Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(TodoLabel, {
      props: { title: "" },
    });

    const labelElement = getByTestId("TodoLabel");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("");
  });

  it("renders correctly with a title", () => {
    const { getByTestId } = render(TodoLabel, {
      props: { title: "Test Todo" },
    });

    const labelElement = getByTestId("TodoLabel");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("Test Todo");
  });

  it("emits the 'edit' event on double-click", async () => {
    const { getByTestId, emitted } = render(TodoLabel, {
      props: { title: "Editable Todo" },
    });

    const labelElement = getByTestId("TodoLabel");
    await fireEvent.dblClick(labelElement);

    expect(emitted()["edit"]).toBeTruthy();
    expect(emitted()["edit"]).toHaveLength(1);
  });
});