import { mount } from '@vue/test-utils';
import RemainingCounter from './12_RemainingCounter.vue';

describe('RemainingCounter', () => {
  test('renders correctly with default count of 0', () => {
    const wrapper = mount(RemainingCounter);
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('0 items left');
  });

  test('renders correctly with a specific count', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('5 items left');
  });

  test('displays singular "item" when count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('1 item left');
  });

  test('displays plural "items" when count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('2 items left');
  });

  test('updates rendering when count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('3 items left');

    await wrapper.setProps({ count: 1 });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('1 item left');
  });
});