import { mount } from '@vue/test-utils';
import TodoItemCheckbox from './06_TodoItemCheckbox.vue';

/**
 * @jest-environment jsdom
 */

describe('06_TodoItemCheckbox', () => {

  // Test 1: Component renders correctly
  test('should render an input of type checkbox', () => {
    const wrapper = mount(TodoItemCheckbox);
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.attributes('type')).toBe('checkbox');
  });

  // Test 2: Prop handling - default value
  test('should be unchecked by default when no "checked" prop is provided', () => {
    const wrapper = mount(TodoItemCheckbox);
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  // Test 3: Prop handling - checked: false
  test('should be unchecked when the "checked" prop is explicitly false', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false
      }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  // Test 4: Prop handling - checked: true
  test('should be checked when the "checked" prop is true', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: true
      }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });
  
  // Test 5: Prop updates
  test('should update its checked state when the "checked" prop changes', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false
      }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(false);

    await wrapper.setProps({ checked: true });
    expect(checkbox.element.checked).toBe(true);

    await wrapper.setProps({ checked: false });
    expect(checkbox.element.checked).toBe(false);
  });

  // Test 6: User Interaction - Emitting events
  test('should emit a "change" event with the new checked state when clicked', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false
      }
    });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');

    // Simulate user checking the box
    await checkbox.setValue(true); // setValue is the idiomatic way to trigger change on inputs in vue-test-utils

    // Check that the event was emitted
    expect(wrapper.emitted()).toHaveProperty('change');
    // Check that one event has been emitted
    expect(wrapper.emitted('change')).toHaveLength(1);
    // Check the payload of the event
    expect(wrapper.emitted('change')[0]).toEqual([true]);

    // Simulate user unchecking the box
    await wrapper.setProps({ checked: true }); // Sync component state before next interaction
    await checkbox.setValue(false);

    expect(wrapper.emitted('change')).toHaveLength(2);
    expect(wrapper.emitted('change')[1]).toEqual([false]);
  });
});