import { shallowMount } from '@vue/test-utils';
import AddTodoInput from './01_AddTodoInput.vue';

describe('AddTodoInput component', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AddTodoInput, {
      props: { placeholder: 'Custom placeholder' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="AddTodoInput"]').exists()).toBe(true);
    expect(wrapper.find('input').classes()).toContain('add-todo-input');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder');
  });

  it('emits "add" event when Enter key is pressed', async () => {
    const wrapper = shallowMount(AddTodoInput);
    const input = wrapper.find('input');
    await input.setValue('Test todo');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('add')[0][0]).toBe('Test todo');
    expect(input.element.value).toBe('');
  });

  it('does not emit "add" event when Enter key is pressed with empty input', async () => {
    const wrapper = shallowMount(AddTodoInput);
    const input = wrapper.find('input');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('add')).toBeUndefined();
  });

  it('updates text state when input value changes', async () => {
    const wrapper = shallowMount(AddTodoInput);
    const input = wrapper.find('input');
    await input.setValue('New todo');
    expect(wrapper.vm.text).toBe('New todo');
  });

  it('uses default placeholder when no props are passed', () => {
    const wrapper = shallowMount(AddTodoInput);
    expect(wrapper.find('input').attributes('placeholder')).toBe('What needs to be done?');
  });
});