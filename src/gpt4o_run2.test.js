import { mount } from "@vue/test-utils";
import TodoItemCheckbox from "./06_TodoItemCheckbox.vue";

describe("06_TodoItemCheckbox Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(TodoItemCheckbox);
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes("type")).toBe("checkbox");
    expect(checkbox.element.checked).toBe(false);
  });

  it("renders as checked when the checked prop is true", () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: true }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it("renders as unchecked when the checked prop is false", () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: false }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  it("emits change event with the new value when clicked", async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: false }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    await checkbox.setValue(true);
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual([true]);

    await checkbox.setValue(false);
    expect(wrapper.emitted().change[1]).toEqual([false]);
  });

  it("does not emit change event if no user interaction occurs", () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: { checked: false }
    });
    expect(wrapper.emitted().change).toBeFalsy();
  });
});