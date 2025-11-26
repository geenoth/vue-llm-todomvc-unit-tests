import { mount } from "@vue/test-utils";
import TodoItemCheckbox from "./06_TodoItemCheckbox.vue";

describe("06_TodoItemCheckbox.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: false },
    });
    const checkbox = wrapper.get('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes("type")).toBe("checkbox");
    expect(checkbox.element.checked).toBe(false);
  });

  it("renders as checked when `checked` prop is true", () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: true },
    });
    const checkbox = wrapper.get('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it("emits `change` event with true when checked", async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: false },
    });
    const checkbox = wrapper.get('[data-testid="TodoItemCheckbox"]');
    await checkbox.setChecked(true);
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")[0]).toEqual([true]);
  });

  it("emits `change` event with false when unchecked", async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: true },
    });
    const checkbox = wrapper.get('[data-testid="TodoItemCheckbox"]');
    await checkbox.setChecked(false);
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")[0]).toEqual([false]);
  });
});