import { mount } from '@vue/test-utils';
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DestroyButton);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders the button correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.get('[data-testid="DestroyButton"]').exists()).toBe(true);
    expect(wrapper.text()).toBe('×');
    expect(wrapper.attributes('aria-label')).toBe('Delete');
    expect(wrapper.attributes('type')).toBe('button');
  });

  test('emits destroy event on button click', async () => {
    const button = wrapper.get('[data-testid="DestroyButton"]');
    await button.trigger('click');
    expect(wrapper.emitted('destroy')).toBeTruthy();
    expect(wrapper.emitted('destroy').length).toBe(1);
  });
});