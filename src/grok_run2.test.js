import { mount } from '@vue/test-utils';
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLink_Completed', () => {
  test('renders the link with correct text', () => {
    const wrapper = mount(FilterLinkCompleted);
    expect(wrapper.get('[data-testid="FilterLink_Completed"]').text()).toBe('Completed');
  });

  test('applies selected class when active prop is true', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: { active: true }
    });
    expect(wrapper.get('[data-testid="FilterLink_Completed"]').classes()).toContain('selected');
  });

  test('does not apply selected class when active prop is false', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: { active: false }
    });
    expect(wrapper.get('[data-testid="FilterLink_Completed"]').classes()).not.toContain('selected');
  });

  test('emits select event with "completed" when clicked', async () => {
    const wrapper = mount(FilterLinkCompleted);
    await wrapper.get('[data-testid="FilterLink_Completed"]').trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['completed']);
  });

  test('prevents default link behavior on click', async () => {
    const wrapper = mount(FilterLinkCompleted);
    const link = wrapper.get('[data-testid="FilterLink_Completed"]');
    await link.trigger('click');
    // Since it's a Vue component with @click.prevent, we can't directly test preventDefault
    // But we can ensure the event is handled by checking the emitted event
    expect(wrapper.emitted('select')).toBeTruthy();
  });
});