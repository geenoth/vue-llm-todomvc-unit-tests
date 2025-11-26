import { mount } from '@vue/test-utils';
import FilterLinkActive from './10_FilterLink_Active.vue';

describe('FilterLink_Active', () => {
  test('renders the link with correct text', () => {
    const wrapper = mount(FilterLinkActive);
    expect(wrapper.get('[data-testid="FilterLink_Active"]').text()).toBe('Active');
  });

  test('applies selected class when active prop is true', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: true }
    });
    expect(wrapper.get('[data-testid="FilterLink_Active"]').classes()).toContain('selected');
  });

  test('does not apply selected class when active prop is false', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: false }
    });
    expect(wrapper.get('[data-testid="FilterLink_Active"]').classes()).not.toContain('selected');
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