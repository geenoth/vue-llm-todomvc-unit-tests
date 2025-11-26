import { mount } from "@vue/test-utils";
import ToggleAllCheckbox from "./07_ToggleAllCheckbox.vue";

describe("07_ToggleAllCheckbox Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(ToggleAllCheckbox);
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes("type")).toBe("checkbox");
    expect(checkbox.element.checked).toBe(false);
  });

  it("renders as checked when allChecked prop is true", () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: true }
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it("renders as unchecked when allChecked prop is false", () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: false }
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  it("emits toggleAll event with the new value when clicked", async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: false }
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    await checkbox.setValue(true);
    expect(wrapper.emitted().toggleAll).toBeTruthy();
    expect(wrapper.emitted().toggleAll[0]).toEqual([true]);

    await checkbox.setValue(false);
    expect(wrapper.emitted().toggleAll[1]).toEqual([false]);
  });

  it("does not emit toggleAll event if no user interaction occurs", () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: false }
    });
    expect(wrapper.emitted().toggleAll).toBeFalsy();
  });
});