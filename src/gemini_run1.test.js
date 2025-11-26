import { mount } from '@vue/test-utils';
import FilterLinkActive from './10_FilterLink_Active.vue';

/**
 * @jest-environment jsdom
 */
describe('FilterLink_Active', () => {
  it('should render the component correctly', () => {
    // Mount the component
    const wrapper = mount(FilterLinkActive);

    // Find the link element using data-testid
    const linkElement = wrapper.find('[data-testid="FilterLink_Active"]');

    // Assert that the link element exists
    expect(linkElement.exists()).toBe(true);

    // Assert that the link text is "Active"
    expect(linkElement.text()).toBe('Active');
  });

  it('should not have the "selected" class by default', () => {
    // Mount the component with default props
    const wrapper = mount(FilterLinkActive);

    // Assert that the "selected" class is not present
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes('selected')).toBe(false);
  });

  it('should not have the "selected" class when the "active" prop is false', () => {
    // Mount the component with the active prop set to false
    const wrapper = mount(FilterLinkActive, {
      props: {
        active: false,
      },
    });

    // Assert that the "selected" class is not present
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes('selected')).toBe(false);
  });

  it('should have the "selected" class when the "active" prop is true', () => {
    // Mount the component with the active prop set to true
    const wrapper = mount(FilterLinkActive, {
      props: {
        active: true,
      },
    });

    // Assert that the "selected" class is present
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes('selected')).toBe(true);
  });

  it('should emit a "select" event with "active" payload on click', async () => {
    // Mount the component
    const wrapper = mount(FilterLinkActive);

    // Find the link element and trigger a click event
    await wrapper.find('[data-testid="FilterLink_Active"]').trigger('click');

    // Assert that the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select');

    // Assert that the 'select' event was emitted exactly once
    expect(wrapper.emitted('select')).toHaveLength(1);

    // Assert that the payload of the emitted event is ['active']
    expect(wrapper.emitted('select')[0]).toEqual(['active']);
  });
});