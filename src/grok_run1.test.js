import { mount } from '@vue/test-utils';
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLink_Completed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FilterLinkCompleted, {
      props: {
        active: false,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders the component with correct text', () => {
    expect(wrapper.text()).toBe('Completed');
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').exists()).toBe(true);
  });

  test('applies selected class when active prop is true', async () => {
    await wrapper.setProps({ active: true });
    expect(wrapper.classes()).toContain('selected');
  });

  test('does not apply selected class when active prop is false', () => {
    expect(wrapper.classes()).not.toContain('selected');
  });

  test('emits select event with "completed" when clicked', async () => {
    await wrapper.trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['completed']);
  });

  test('prevents default behavior on click', async () => {
    const clickEvent = await wrapper.trigger('click');
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});