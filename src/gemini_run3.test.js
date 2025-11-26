import { mount } from '@vue/test-utils';
import DestroyButton from './03_DestroyButton.vue';

describe('DestroyButton', () => {
  /**
   * Test case to ensure the component renders correctly.
   * It checks if the button exists and has the correct static attributes.
   */
  it('should render correctly', () => {
    // Mount the component
    const wrapper = mount(DestroyButton);

    // Find the button element using the data-testid selector
    const button = wrapper.find('[data-testid="DestroyButton"]');

    // Assert that the button element exists in the component
    expect(button.exists()).toBe(true);

    // Assert that the button has the correct type attribute
    expect(button.attributes('type')).toBe('button');

    // Assert that the button has the correct aria-label for accessibility
    expect(button.attributes('aria-label')).toBe('Delete');

    // Assert that the button's text content is the multiplication sign '×'
    expect(button.text()).toBe('×');
  });

  /**
   * Test case to verify that clicking the button emits a 'destroy' event.
   * This is the primary user interaction for this component.
   */
  it('should emit a "destroy" event when clicked', async () => {
    // Mount the component
    const wrapper = mount(DestroyButton);

    // Find the button element
    const button = wrapper.find('[data-testid="DestroyButton"]');

    // Simulate a click event on the button
    await button.trigger('click');

    // Check if the 'destroy' event has been emitted
    // wrapper.emitted() returns an object where keys are event names
    expect(wrapper.emitted()).toHaveProperty('destroy');

    // Optionally, check how many times the event was emitted
    expect(wrapper.emitted('destroy')).toHaveLength(1);
  });
});