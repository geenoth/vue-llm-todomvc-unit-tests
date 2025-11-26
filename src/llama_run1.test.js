import { shallowMount } from '@vue/test-utils';
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton component', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DestroyButton);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="DestroyButton"]').exists()).toBe(true);
    expect(wrapper.find('button').attributes('type')).toBe('button');
    expect(wrapper.find('button').attributes('aria-label')).toBe('Delete');
    expect(wrapper.find('button').text()).toBe('×');
  });

  it('emits "destroy" event when clicked', async () => {
    const wrapper = shallowMount(DestroyButton);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('destroy')[0][0]).toBeUndefined();
  });
});