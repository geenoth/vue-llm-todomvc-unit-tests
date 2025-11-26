import { mount } from '@vue/test-utils';
import TodoItemCheckbox from './06_TodoItemCheckbox.vue';

describe('TodoItemCheckbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly with default props', () => {
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.exists()).toBe(true);
    expect(checkbox.element.checked).toBe(false);
  });

  test('renders correctly with checked prop set to true', async () => {
    await wrapper.setProps({ checked: true });
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  test('emits change event when checkbox is clicked', async () => {
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')[0]).toEqual([true]);
  });

  test('toggles checked state and emits correct value on change', async () => {
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    await checkbox.setChecked(true);
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')[0]).toEqual([true]);

    await checkbox.setChecked(false);
    expect(wrapper.emitted('change')[1]).toEqual([false]);
  });
});