import { shallowMount } from '@vue/test-utils';
import EditTodoInput from './02_EditTodoInput.vue';

describe('EditTodoInput component', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value', placeholder: 'Custom placeholder' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="EditTodoInput"]').exists()).toBe(true);
    expect(wrapper.find('input').classes()).toContain('edit-todo-input');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder');
    expect(wrapper.find('input').element.value).toBe('Initial value');
  });

  it('updates text state when input value changes', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value' },
    });
    const input = wrapper.find('input');
    await input.setValue('New value');
    expect(wrapper.vm.text).toBe('New value');
  });

  it('emits "save" and "update:modelValue" events when Enter key is pressed', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value' },
    });
    const input = wrapper.find('input');
    await input.setValue('Updated value');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('save')[0][0]).toBe('Updated value');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('Updated value');
  });

  it('emits "cancel" event when Esc key is pressed', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value' },
    });
    const input = wrapper.find('input');
    await input.trigger('keydown.esc');
    expect(wrapper.emitted('cancel')[0][0]).toBeUndefined();
  });

  it('emits "save" and "update:modelValue" events when input is blurred', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value' },
    });
    const input = wrapper.find('input');
    await input.setValue('Updated value');
    await input.trigger('blur');
    expect(wrapper.emitted('save')[0][0]).toBe('Updated value');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('Updated value');
  });

  it('uses default placeholder when no props are passed', () => {
    const wrapper = shallowMount(EditTodoInput);
    expect(wrapper.find('input').attributes('placeholder')).toBe('Edit todo');
  });

  it('updates text state when modelValue prop changes', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: { modelValue: 'Initial value' },
    });
    await wrapper.setProps({ modelValue: 'New value' });
    expect(wrapper.vm.text).toBe('New value');
  });
});