import { mount } from '@vue/test-utils';
import RemainingCounter from './12_RemainingCounter.vue';

/**
 * @jest-environment jsdom
 */
describe('12_RemainingCounter', () => {
  it('should render the component without crashing', () => {
    const wrapper = mount(RemainingCounter);
    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true);
  });

  it('should render the default count of 0 correctly', () => {
    const wrapper = mount(RemainingCounter);
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe('0 items left');
  });

  it('should display the correct count passed as a prop', () => {
    const count = 5;
    const wrapper = mount(RemainingCounter, {
      props: { count },
    });
    const countElement = wrapper.find('strong');
    expect(countElement.text()).toBe(String(count));
  });

  it('should display "item" when the count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 },
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe('1 item left');
  });

  it('should display "items" when the count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 },
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe('3 items left');
  });

  it('should display "items" when the count is 0', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 },
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe('0 items left');
  });

  it('should update the displayed text when the count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 10 },
    });
    expect(wrapper.text()).toContain('10 items left');

    await wrapper.setProps({ count: 1 });
    expect(wrapper.text()).toContain('1 item left');

    await wrapper.setProps({ count: 0 });
    expect(wrapper.text()).toContain('0 items left');
  });
});