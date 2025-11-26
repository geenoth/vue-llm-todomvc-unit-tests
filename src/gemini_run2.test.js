import { mount } from '@vue/test-utils';
import FilterLinkCompleted from './11_FilterLink_Completed.vue';

/**
 * @jest-environment jsdom
 */

describe('FilterLink_Completed.vue', () => {
  // Test 1: Component renders correctly with default props
  test('renders the link with default state', () => {
    const wrapper = mount(FilterLinkCompleted);

    // Find the link element using the data-testid
    const linkElement = wrapper.find('[data-testid="FilterLink_Completed"]');

    // Assert that the link exists
    expect(linkElement.exists()).toBe(true);

    // Assert that the link text is "Completed"
    expect(linkElement.text()).toBe('Completed');

    // Assert that the 'selected' class is not present by default
    expect(linkElement.classes('selected')).toBe(false);
  });

  // Test 2: Component correctly reflects the 'active' prop when true
  test('applies the "selected" class when the "active" prop is true', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: {
        active: true,
      },
    });

    const linkElement = wrapper.find('[data-testid="FilterLink_Completed"]');

    // Assert that the 'selected' class is present
    expect(linkElement.classes('selected')).toBe(true);
  });

  // Test 3: Component correctly reflects the 'active' prop when false
  test('does not apply the "selected" class when the "active" prop is false', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: {
        active: false,
      },
    });

    const linkElement = wrapper.find('[data-testid="FilterLink_Completed"]');

    // Assert that the 'selected' class is not present
    expect(linkElement.classes('selected')).toBe(false);
  });

  // Test 4: Clicking the link emits the 'select' event with the correct payload
  test('emits a "select" event with "completed" payload on click', async () => {
    const wrapper = mount(FilterLinkCompleted);

    const linkElement = wrapper.find('[data-testid="FilterLink_Completed"]');

    // Simulate a click event
    await linkElement.trigger('click');

    // Assert that the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select');

    // Assert that the 'select' event was emitted exactly once
    expect(wrapper.emitted('select')).toHaveLength(1);

    // Assert that the payload of the emitted event is ['completed']
    expect(wrapper.emitted('select')[0]).toEqual(['completed']);
  });
});