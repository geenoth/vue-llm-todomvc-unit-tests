import { shallowMount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AddTodoInput)
    expect(wrapper.find('[data-testid="AddTodoInput"]').exists()).toBe(true)
  })

  it('renders with default placeholder', () => {
    const wrapper = shallowMount(AddTodoInput)
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe('What needs to be done?')
  })

  it('renders with custom placeholder', () => {
    const wrapper = shallowMount(AddTodoInput, {
      props: { placeholder: 'Custom placeholder' }
    })
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe('Custom placeholder')
  })

  it('emits "add" event when Enter key is pressed', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New todo item')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toHaveLength(1)
    expect(wrapper.emitted('add')[0][0]).toBe('New todo item')
  })

  it('clears input field after adding a new todo item', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New todo item')
    await input.trigger('keydown.enter')
    expect(input.element.value).toBe('')
  })

  it('does not emit "add" event when Enter key is pressed with empty input', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeUndefined()
  })
})