import { shallowMount } from '@vue/test-utils';
import RemainingCounter from './12_RemainingCounter.vue';

describe('RemainingCounter', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 2 },
    });
    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('2');
    expect(wrapper.text()).toContain('items left');
  });

  it('renders singular form when count is 1', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 1 },
    });
    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('item left');
  });

  it('renders plural form when count is not 1', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 3 },
    });
    expect(wrapper.text()).toContain('3');
    expect(wrapper.text()).toContain('items left');
  });

  it('updates text when props change', async () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 2 },
    });
    await wrapper.setProps({ count: 1 });
    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('item left');
  });
});