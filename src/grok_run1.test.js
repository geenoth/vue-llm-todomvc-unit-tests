import { mount } from '@vue/test-utils';
import RemainingCounter from './12_RemainingCounter.vue';

describe('RemainingCounter', () => {
  test('renders the correct count and singular "item" when count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('1 item left');
  });

  test('renders the correct count and plural "items" when count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('5 items left');
  });

  test('renders the correct count and plural "items" when count is 0', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('0 items left');
  });

  test('renders with default count of 0 when no prop is provided', () => {
    const wrapper = mount(RemainingCounter);
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('0 items left');
  });

  test('updates rendering when count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('2 items left');

    await wrapper.setProps({ count: 1 });
    expect(wrapper.get('[data-testid="RemainingCounter"]').text()).toContain('1 item left');
  });
});