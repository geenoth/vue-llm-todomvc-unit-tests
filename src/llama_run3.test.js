import { shallowMount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AddTodoInput, {
      props: {
        placeholder: 'Custom placeholder',
      },
    })
    expect(wrapper.find('[data-testid="AddTodoInput"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe(
      'Custom placeholder',
    )
  })

  it('updates the input field when typed', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const inputField = wrapper.find('[data-testid="AddTodoInput"]')
    await inputField.setValue('New todo item')
    expect(wrapper.vm.text).toBe('New todo item')
  })

  it('emits "add" event when Enter key is pressed', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const inputField = wrapper.find('[data-testid="AddTodoInput"]')
    await inputField.setValue('New todo item')
    await inputField.trigger('keydown.enter')
    expect(wrapper.emitted('add')[0][0]).toBe('New todo item')
  })

  it('clears the input field after submitting', async () => {
    const wrapper = shallowMount(AddTodoInput)
    const inputField = wrapper.find('[data-testid="AddTodoInput"]')
    await inputField.setValue('New todo item')
    await inputField.trigger('keydown.enter')
    expect(wrapper.vm.text).toBe('')
  })

  it('uses default placeholder when not provided', () => {
    const wrapper = shallowMount(AddTodoInput)
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe(
      'What needs to be done?',
    )
  })
})
