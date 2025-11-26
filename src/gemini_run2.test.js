import { mount } from '@vue/test-utils';
import EditTodoInput from './02_EditTodoInput.vue'

/**
 * @jest-environment jsdom
 */

describe('EditTodoInput.vue', () => {
  // 1. Test correct rendering
  it('renders the input with initial modelValue and placeholder', () => {
    const modelValue = 'Initial Todo Text';
    const placeholder = 'Your placeholder';
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue,
        placeholder,
      },
    });

    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe(modelValue);
    expect(input.element.placeholder).toBe(placeholder);
  });

  it('renders with default placeholder if none is provided', () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.element.placeholder).toBe('Edit todo');
  });

  // 2. Test user interactions
  it('emits "save" and "update:modelValue" with the trimmed value on Enter key press', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'Initial',
      },
    });

    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue('  New Value  ');
    await input.trigger('keydown.enter');

    // Check for the "save" event
    expect(wrapper.emitted()).toHaveProperty('save');
    expect(wrapper.emitted('save')[0]).toEqual(['New Value']);

    // Check for the "update:modelValue" event
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Value']);
  });

  it('emits "save" and "update:modelValue" with the trimmed value on blur', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'Some text',
      },
    });

    const input = wrapper.find('[data-testid="EditTodoInput"]');
    await input.setValue(' Another value ');
    await input.trigger('blur');

    // Check for the "save" event
    expect(wrapper.emitted()).toHaveProperty('save');
    expect(wrapper.emitted('save')[0]).toEqual(['Another value']);

    // Check for the "update:modelValue" event
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Another value']);
  });

  it('emits an empty string if the input is only spaces on save', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');

    await input.setValue('   ');
    await input.trigger('keydown.enter');

    expect(wrapper.emitted('save')[0]).toEqual(['']);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['']);
  });


  it('emits "cancel" event on Escape key press', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');

    await input.setValue('some value');
    await input.trigger('keydown.esc');

    // Check that cancel was emitted but save was not
    expect(wrapper.emitted()).toHaveProperty('cancel');
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    expect(wrapper.emitted()).not.toHaveProperty('save');
  });


  // 3. Test state changes and props
  it('updates the input value when the modelValue prop changes', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'First Value',
      },
    });

    const input = wrapper.find('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe('First Value');

    await wrapper.setProps({ modelValue: 'Second Value' });

    expect(input.element.value).toBe('Second Value');
  });

  it('the internal text ref follows the input value', async () => {
    const wrapper = mount(EditTodoInput);
    const input = wrapper.find('[data-testid="EditTodoInput"]');

    await input.setValue('User is typing');
    expect(wrapper.vm.text).toBe('User is typing');
  });
});