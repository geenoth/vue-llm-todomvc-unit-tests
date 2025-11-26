import { mount } from '@vue/test-utils';
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue';

/**
 * @jest-environment jsdom
 */

describe('ToggleAllCheckbox', () => {
  // 1. Test correct rendering
  it('should render the checkbox input element', () => {
    const wrapper = mount(ToggleAllCheckbox);
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    expect(checkbox.exists()).toBe(true);
    expect(checkbox.element.tagName).toBe('INPUT');
    expect(checkbox.attributes('type')).toBe('checkbox');
  });

  // 2. Test props: default state
  it('should be unchecked by default', () => {
    const wrapper = mount(ToggleAllCheckbox);
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    expect(checkbox.element.checked).toBe(false);
  });

  // 3. Test props: checked state
  it('should be checked when the "allChecked" prop is true', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    expect(checkbox.element.checked).toBe(true);
  });

  // 4. Test props: unchecked state
  it('should be unchecked when the "allChecked" prop is false', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    expect(checkbox.element.checked).toBe(false);
  });

  // 5. Test state changes based on props
  it('should update its checked status when the "allChecked" prop changes', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    // Initially should be unchecked
    expect(checkbox.element.checked).toBe(false);

    // Update prop to true
    await wrapper.setProps({ allChecked: true });
    expect(checkbox.element.checked).toBe(true);

    // Update prop back to false
    await wrapper.setProps({ allChecked: false });
    expect(checkbox.element.checked).toBe(false);
  });

  // 6. Test user interactions: emitting event when checking
  it('should emit "toggleAll" with a true payload when clicked to check', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    // Simulate user checking the box
    await checkbox.setValue(true);

    // Verify that the event was emitted
    expect(wrapper.emitted()).toHaveProperty('toggleAll');
    // Verify that it was emitted once
    expect(wrapper.emitted('toggleAll')).toHaveLength(1);
    // Verify the payload of the event
    expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
  });

  // 7. Test user interactions: emitting event when unchecking
  it('should emit "toggleAll" with a false payload when clicked to uncheck', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');

    // Simulate user unchecking the box
    await checkbox.setValue(false);

    // Verify that the event was emitted
    expect(wrapper.emitted()).toHaveProperty('toggleAll');
    // Verify that it was emitted once
    expect(wrapper.emitted('toggleAll')).toHaveLength(1);
    // Verify the payload of the event
    expect(wrapper.emitted('toggleAll')[0]).toEqual([false]);
  });
});