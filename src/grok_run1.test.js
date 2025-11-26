import { mount } from '@vue/test-utils';
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  test('renders button with correct text', () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    expect(wrapper.get('[data-testid="ClearCompletedButton"]').text()).toBe('Clear completed');
  });

  test('button is disabled when hasCompleted is false', () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    expect(wrapper.get('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeDefined();
  });

  test('button is enabled when hasCompleted is true', () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true }
    });
    expect(wrapper.get('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeUndefined();
  });

  test('emits clear event when clicked and hasCompleted is true', async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true }
    });
    await wrapper.get('[data-testid="ClearCompletedButton"]').trigger('click');
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });

  test('does not emit clear event when clicked and hasCompleted is false', async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    await wrapper.get('[data-testid="ClearCompletedButton"]').trigger('click');
    expect(wrapper.emitted('clear')).toBeUndefined();
  });

  test('updates disabled state when props change', async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    expect(wrapper.get('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeDefined();
    await wrapper.setProps({ hasCompleted: true });
    expect(wrapper.get('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeUndefined();
  });
});