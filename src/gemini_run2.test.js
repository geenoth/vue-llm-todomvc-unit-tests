import { mount } from '@vue/test-utils';
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue';

/**
 * @jest-environment jsdom
 */

describe('07_ToggleAllCheckbox', () => {
  it('should render an input of type checkbox', () => {
    const wrapper = mount(ToggleAllCheckbox);
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes('type')).toBe('checkbox');
  });

  it('should be unchecked by default', () => {
    const wrapper = mount(ToggleAllCheckbox);
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  it('should be unchecked when the "allChecked" prop is false', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  it('should be checked when the "allChecked" prop is true', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it('should emit a "toggleAll" event with "true" when clicked while unchecked', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    await checkbox.setValue(true);

    expect(wrapper.emitted()).toHaveProperty('toggleAll');
    expect(wrapper.emitted('toggleAll')).toHaveLength(1);
    expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
  });

  it('should emit a "toggleAll" event with "false" when clicked while checked', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    await checkbox.setValue(false);

    expect(wrapper.emitted()).toHaveProperty('toggleAll');
    expect(wrapper.emitted('toggleAll')).toHaveLength(1);
    expect(wrapper.emitted('toggleAll')[0]).toEqual([false]);
  });

  it('should update its checked state when the "allChecked" prop changes', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    expect(checkbox.element.checked).toBe(false);

    await wrapper.setProps({ allChecked: true });

    expect(checkbox.element.checked).toBe(true);

    await wrapper.setProps({ allChecked: false });

    expect(checkbox.element.checked).toBe(false);
  });
});