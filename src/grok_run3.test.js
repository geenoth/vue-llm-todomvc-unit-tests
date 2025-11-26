import { mount } from '@vue/test-utils';
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLink_Completed', () => {
  test('renders the link with correct text', () => {
    const wrapper = mount(FilterLinkCompleted);
    expect(wrapper.text()).toBe('Completed');
    expect(wrapper.get('[data-testid="FilterLink_Completed"]').exists()).toBe(true);
  });

  test('applies selected class when active prop is true', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: { active: true }
    });
    expect(wrapper.classes()).toContain('selected');
  });

  test('does not apply selected class when active prop is false', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: { active: false }
    });
    expect(wrapper.classes()).not.toContain('selected');
  });

  test('emits select event with "completed" when clicked', async () => {
    const wrapper = mount(FilterLinkCompleted);
    await wrapper.trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['completed']);
  });

  test('prevents default behavior on click', async () => {
    const wrapper = mount(FilterLinkCompleted);
    const clickEvent = await wrapper.trigger('click');
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});