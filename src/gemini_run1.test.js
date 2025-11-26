import { mount } from '@vue/test-utils';
import FilterLinkCompleted from './11_FilterLink_Completed.vue';

/**
 * @jest-environment jsdom
 */

describe('11_FilterLink_Completed', () => {
  it('should render the link with the correct text', () => {
    const wrapper = mount(FilterLinkCompleted);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe('Completed');
  });

  it('should not have the "selected" class by default', () => {
    const wrapper = mount(FilterLinkCompleted);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.classes()).not.toContain('selected');
  });

  it('should not have the "selected" class when the "active" prop is false', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: {
        active: false,
      },
    });
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.classes()).not.toContain('selected');
  });

  it('should have the "selected" class when the "active" prop is true', () => {
    const wrapper = mount(FilterLinkCompleted, {
      props: {
        active: true,
      },
    });
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.classes()).toContain('selected');
  });

  it('should emit a "select" event with "completed" payload on click', async () => {
    const wrapper = mount(FilterLinkCompleted);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');

    await link.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('select');
    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0]).toEqual(['completed']);
  });

  it('should prevent the default click behavior', async () => {
    const wrapper = mount(FilterLinkCompleted);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    link.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});