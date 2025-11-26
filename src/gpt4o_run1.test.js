import { mount } from '@vue/test-utils';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import RemainingCounter from './12_RemainingCounter.vue';

describe('12_RemainingCounter.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(RemainingCounter);
    const strong = wrapper.find('[data-testid="RemainingCounter"] strong');
    const span = wrapper.find('[data-testid="RemainingCounter"] span');

    expect(strong.text()).toBe('0');
    expect(span.text()).toBe(' items left');
  });

  it('renders the correct count and item label for singular', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 },
    });
    const strong = wrapper.find('[data-testid="RemainingCounter"] strong');
    const span = wrapper.find('[data-testid="RemainingCounter"] span');

    expect(strong.text()).toBe('1');
    expect(span.text()).toBe(' item left');
  });

  it('renders the correct count and item label for plural', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 },
    });
    const strong = wrapper.find('[data-testid="RemainingCounter"] strong');
    const span = wrapper.find('[data-testid="RemainingCounter"] span');

    expect(strong.text()).toBe('5');
    expect(span.text()).toBe(' items left');
  });

  it('updates the text when props change', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 },
    });

    const strong = wrapper.find('[data-testid="RemainingCounter"] strong');
    const span = wrapper.find('[data-testid="RemainingCounter"] span');
    await wrapper.setProps({ count: 1 });

    expect(strong.text()).toBe('1');
    expect(span.text()).toBe(' item left');

    await wrapper.setProps({ count: 10 });

    expect(strong.text()).toBe('10');
    expect(span.text()).toBe(' items left');
  });

  it('handles extreme values', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 },
    });

    const strong = wrapper.find('[data-testid="RemainingCounter"] strong');
    const span = wrapper.find('[data-testid="RemainingCounter"] span');
    expect(strong.text()).toBe('0');
    expect(span.text()).toBe(' items left');

    await wrapper.setProps({ count: -1 });

    expect(strong.text()).toBe('-1');
    expect(span.text()).toBe(' items left');
  });
});