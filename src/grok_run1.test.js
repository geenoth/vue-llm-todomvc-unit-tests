import { mount } from '@vue/test-utils';
import FilterLinkActive from './10_FilterLink_Active.vue';

describe('FilterLink_Active', () => {
  test('renders correctly with default props', () => {
    const wrapper = mount(FilterLinkActive);
    expect(wrapper.get('[data-testid="FilterLink_Active"]').text()).toBe('Active');
    expect(wrapper.classes()).not.toContain('selected');
  });

  test('renders with active prop set to true', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: true }
    });
    expect(wrapper.classes()).toContain('selected');
  });

  test('renders with active prop set to false', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: false }
    });
    expect(wrapper.classes()).not.toContain('selected');
  });

  test('emits select event with "active" when clicked', async () => {
    const wrapper = mount(FilterLinkActive);
    await wrapper.get('[data-testid="FilterLink_Active"]').trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['active']);
  });

  test('prevents default behavior on click', async () => {
    const wrapper = mount(FilterLinkActive);
    const clickEvent = await wrapper.get('[data-testid="FilterLink_Active"]').trigger('click');
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});