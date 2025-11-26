import { mount } from '@vue/test-utils';
import EditTodoInput from './02_EditTodoInput.vue';

describe('EditTodoInput', () => {
  // Test 1: Correct rendering with default props
  test('renders correctly with default props', () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('');
    expect(input.element.placeholder).toBe('Edit todo');
  });

  // Test 2: Correct rendering with custom props
  test('renders with initial modelValue and placeholder props', () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'Initial todo text',
        placeholder: 'What needs to be done?',
      },
    });
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe('Initial todo text');
    expect(input.element.placeholder).toBe('What needs to be done?');
  });

  // Test 3: State changes on user input
  test('updates internal state when user types', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('New todo value');
    expect(input.element.value).toBe('New todo value');
  });

  // Test 4: Emits 'save' and 'update:modelValue' on Enter key press
  test('emits save and update:modelValue events on Enter key press', async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: 'Something to do' },
    });
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('Updated todo');
    await input.trigger('keydown.enter');

    expect(wrapper.emitted()).toHaveProperty('save');
    expect(wrapper.emitted().save[0]).toEqual(['Updated todo']);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Updated todo']);
  });

  // Test 5: Emits 'save' and 'update:modelValue' on blur
  test('emits save and update:modelValue events on blur', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('Save on blur');
    await input.trigger('blur');

    expect(wrapper.emitted()).toHaveProperty('save');
    expect(wrapper.emitted().save[0]).toEqual(['Save on blur']);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Save on blur']);
  });

  // Test 6: Emits 'cancel' on Escape key press
  test('emits cancel event on Escape key press', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.trigger('keydown.esc');

    expect(wrapper.emitted()).toHaveProperty('cancel');
    expect(wrapper.emitted().cancel).toHaveLength(1);
    expect(wrapper.emitted()).not.toHaveProperty('save');
  });

  // Test 7: Props update correctly
  test('updates its value when the modelValue prop changes', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'First value',
      },
    });
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe('First value');

    await wrapper.setProps({ modelValue: 'Second value' });

    expect(input.element.value).toBe('Second value');
  });

  // Test 8: Trims value on save
  test('trims the input value on save', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('   a lot of space   ');
    await input.trigger('keydown.enter');

    expect(wrapper.emitted().save[0]).toEqual(['a lot of space']);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['a lot of space']);
  });

  // Test 9: Handles empty input on save
  test('emits an empty string if input is only whitespace on save', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('    ');
    await input.trigger('keydown.enter');

    expect(wrapper.emitted().save[0]).toEqual(['']);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['']);
  });
});