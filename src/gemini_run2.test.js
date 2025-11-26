import { mount } from '@vue/test-utils';
import ClearCompletedButton from './04_ClearCompletedButton.vue';

/**
 * @jest-environment jsdom
 */

describe('04_ClearCompletedButton', () => {
  it('should render the button correctly', () => {
    // Mount the component
    const wrapper = mount(ClearCompletedButton);

    // Find the button using its data-testid attribute
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');

    // Assert that the button exists
    expect(button.exists()).toBe(true);

    // Assert that the button has the correct text content
    expect(button.text()).toBe('Clear completed');
  });

  it('should be disabled when hasCompleted prop is false', () => {
    // Mount the component with hasCompleted set to false
    const wrapper = mount(ClearCompletedButton, {
      props: {
        hasCompleted: false,
      },
    });

    // Find the button
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');

    // Assert that the disabled attribute is present
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should be disabled by default when hasCompleted prop is not provided', () => {
    // Mount the component without passing any props
    const wrapper = mount(ClearCompletedButton);

    // Find the button
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');

    // Assert that the button is disabled, as the default for hasCompleted is false
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should be enabled when hasCompleted prop is true', () => {
    // Mount the component with hasCompleted set to true
    const wrapper = mount(ClearCompletedButton, {
      props: {
        hasCompleted: true,
      },
    });

    // Find the button
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');

    // Assert that the disabled attribute is not present
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('should not emit a "clear" event on click when it is disabled', async () => {
    // Mount the component (it will be disabled by default)
    const wrapper = mount(ClearCompletedButton);

    // Trigger a click event on the button
    await wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click');

    // Assert that the "clear" event has not been emitted
    expect(wrapper.emitted('clear')).toBeUndefined();
  });

  it('should emit a "clear" event on click when it is enabled', async () => {
    // Mount the component with hasCompleted set to true to enable it
    const wrapper = mount(ClearCompletedButton, {
      props: {
        hasCompleted: true,
      },
    });

    // Trigger a click event on the button
    await wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click');

    // Assert that the component has emitted the "clear" event
    expect(wrapper.emitted()).toHaveProperty('clear');

    // Assert that the "clear" event was emitted exactly once
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });
});