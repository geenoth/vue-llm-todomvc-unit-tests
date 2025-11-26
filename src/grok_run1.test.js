import { mount } from '@vue/test-utils';
import FilterLinkAll from './09_FilterLink_All.vue';

describe('FilterLink_All Component', () => {
  test('renders correctly with default props', () => {
    const wrapper = mount(FilterLinkAll);
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="FilterLink_All"]').text()).toBe('All');
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected');
  });

  test('renders with active prop set to true', () => {
    const wrapper = mount(FilterLinkAll, {
      props: { active: true }
    });
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).toContain('selected');
  });

  test('renders with active prop set to false', () => {
    const wrapper = mount(FilterLinkAll, {
      props: { active: false }
    });
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected');
  });

  test('emits select event with "all" when clicked', async () => {
    const wrapper = mount(FilterLinkAll);
    await wrapper.find('[data-testid="FilterLink_All"]').trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['all']);
  });

  test('prevents default behavior on click', async () => {
    const wrapper = mount(FilterLinkAll);
    const clickEvent = await wrapper.find('[data-testid="FilterLink_All"]').trigger('click');
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});