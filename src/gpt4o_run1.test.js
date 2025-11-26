import { mount } from "@vue/test-utils";
import TodoLabel from "./08_TodoLabel.vue";

describe("08_TodoLabel.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "" },
    });
    const label = wrapper.get('[data-testid="TodoLabel"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("");
  });

  it("renders the title prop", () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "Test Todo" },
    });
    const label = wrapper.get('[data-testid="TodoLabel"]');
    expect(label.text()).toBe("Test Todo");
  });

  it("emits `edit` event on double-click", async () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "Editable Todo" },
    });
    const label = wrapper.get('[data-testid="TodoLabel"]');
    await label.trigger("dblclick");
    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit").length).toBe(1);
  });
});