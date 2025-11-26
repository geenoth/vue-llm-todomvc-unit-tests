import { mount } from "@vue/test-utils";
import TodoLabel from "./08_TodoLabel.vue";

describe("08_TodoLabel Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(TodoLabel);
    const label = wrapper.find('[data-testid="TodoLabel"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("");
  });

  it("renders correctly with a given title", () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "Test Todo" }
    });
    const label = wrapper.find('[data-testid="TodoLabel"]');
    expect(label.text()).toBe("Test Todo");
  });

  it("emits edit event on double-click", async () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "Test Todo" }
    });
    const label = wrapper.find('[data-testid="TodoLabel"]');
    await label.trigger("dblclick");
    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit.length).toBe(1);
  });

  it("does not emit edit event if not double-clicked", () => {
    const wrapper = mount(TodoLabel, {
      props: { title: "Test Todo" }
    });
    expect(wrapper.emitted().edit).toBeFalsy();
  });
});