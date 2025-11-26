import { mount } from "@vue/test-utils";
import ToggleAllCheckbox from "./07_ToggleAllCheckbox.vue";

describe("07_ToggleAllCheckbox.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: false },
    });
    const checkbox = wrapper.get('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes("type")).toBe("checkbox");
    expect(checkbox.element.checked).toBe(false);
  });

  it("renders as checked when `allChecked` prop is true", () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: true },
    });
    const checkbox = wrapper.get('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it("emits `toggleAll` event with true when checked", async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: false },
    });
    const checkbox = wrapper.get('[data-testid="ToggleAllCheckbox"]');
    await checkbox.setChecked(true);
    expect(wrapper.emitted("toggleAll")).toBeTruthy();
    expect(wrapper.emitted("toggleAll")[0]).toEqual([true]);
  });

  it("emits `toggleAll` event with false when unchecked", async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: { allChecked: true },
    });
    const checkbox = wrapper.get('[data-testid="ToggleAllCheckbox"]');
    await checkbox.setChecked(false);
    expect(wrapper.emitted("toggleAll")).toBeTruthy();
    expect(wrapper.emitted("toggleAll")[0]).toEqual([false]);
  });
});