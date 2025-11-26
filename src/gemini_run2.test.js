import { mount } from '@vue/test-utils';
import FilterLinkAll from './09_FilterLink_All.vue'; // The component file to be tested

/**
 * @jest-environment jsdom
 */

describe('FilterLink_All', () => {
  // Test 1: Component renders correctly with default props
  it('should render the link with default state', () => {
    const wrapper = mount(FilterLinkAll);

    // Find the link using data-testid
    const link = wrapper.find('[data-testid="FilterLink_All"]');

    // Assert that the link exists
    expect(link.exists()).toBe(true);

    // Assert that the link text is "All"
    expect(link.text()).toBe('All');

    // Assert that the link does not have the "selected" class by default
    expect(link.classes('selected')).toBe(false);

    // Assert that the href attribute is "#"
    expect(link.attributes('href')).toBe('#');
  });

  // Test 2: Prop 'active' is handled correctly when true
  it('should apply the "selected" class when the "active" prop is true', () => {
    const wrapper = mount(FilterLinkAll, {
      props: {
        active: true,
      },
    });

    // Find the link
    const link = wrapper.find('[data-testid="FilterLink_All"]');

    // Assert that the link has the "selected" class
    expect(link.classes('selected')).toBe(true);
  });

  // Test 3: Prop 'active' is handled correctly when explicitly false
  it('should not apply the "selected" class when the "active" prop is false', () => {
    const wrapper = mount(FilterLinkAll, {
      props: {
        active: false,
      },
    });

    // Find the link
    const link = wrapper.find('[data-testid="FilterLink_All"]');

    // Assert that the link does not have the "selected" class
    expect(link.classes('selected')).toBe(false);
  });

  // Test 4: User interaction (click) emits the correct event and payload
  it('should emit a "select" event with the payload "all" when clicked', async () => {
    const wrapper = mount(FilterLinkAll);

    // Find the link
    const link = wrapper.find('[data-testid="FilterLink_All"]');

    // Simulate a click event
    await link.trigger('click');

    // Assert that the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select');

    // Assert that the 'select' event was emitted exactly once
    expect(wrapper.emitted('select')).toHaveLength(1);

    // Assert that the payload of the 'select' event is ['all']
    expect(wrapper.emitted('select')[0]).toEqual(['all']);
  });

  // Test 5: Snapshot test for consistent rendering
  it('matches the snapshot', () => {
    const wrapper = mount(FilterLinkAll);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Test 6: Snapshot test for active state
  it('matches the snapshot when active', () => {
    const wrapper = mount(FilterLinkAll, {
      props: {
        active: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});