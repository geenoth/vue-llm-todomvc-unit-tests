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

  test('renders the button with correct text content', () => {
    expect(wrapper.find('[data-testid="DestroyButton"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="DestroyButton"]').text()).toBe('×');
  });

  test('button has correct aria-label attribute', () => {
    expect(wrapper.find('[data-testid="DestroyButton"]').attributes('aria-label')).toBe('Delete');
  });

  test('emits destroy event when button is clicked', async () => {
    await wrapper.find('[data-testid="DestroyButton"]').trigger('click');
    expect(wrapper.emitted('destroy')).toBeTruthy();
    expect(wrapper.emitted('destroy').length).toBe(1);
  });
});