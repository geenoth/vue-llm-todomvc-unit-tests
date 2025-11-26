import { mount } from '@vue/test-utils';
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'

describe('ToggleAllCheckbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders checkbox input correctly', () => {
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.element.type).toBe('checkbox');
  });

  test('checkbox reflects allChecked prop as unchecked', () => {
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(false);
  });

  test('checkbox reflects allChecked prop as checked', async () => {
    await wrapper.setProps({ allChecked: true });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  test('emits toggleAll event with true when checkbox is checked', async () => {
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    await checkbox.setChecked(true);
    expect(wrapper.emitted('toggleAll')).toBeTruthy();
    expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
  });

  test('emits toggleAll event with false when checkbox is unchecked', async () => {
    await wrapper.setProps({ allChecked: true });
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    await checkbox.setChecked(false);
    expect(wrapper.emitted('toggleAll')).toBeTruthy();
    expect(wrapper.emitted('toggleAll')[0]).toEqual([false]);
  });

  test('emits toggleAll event on change event', async () => {
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
    await checkbox.trigger('change');
    expect(wrapper.emitted('toggleAll')).toBeTruthy();
  });
});