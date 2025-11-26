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

  test('toggles checked state on click and emits correct value', async () => {
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    // Simulate checking the box
    checkbox.element.checked = true;
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')[0]).toEqual([true]);

    // Simulate unchecking the box
    checkbox.element.checked = false;
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')[1]).toEqual([false]);
  });

  test('updates checkbox state when props change', async () => {
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    expect(checkbox.element.checked).toBe(false);

    await wrapper.setProps({ checked: true });
    expect(checkbox.element.checked).toBe(true);

    await wrapper.setProps({ checked: false });
    expect(checkbox.element.checked).toBe(false);
  });
});