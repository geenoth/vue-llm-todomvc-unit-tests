import { mount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput.vue', () => {
  // Test 1: Component renders correctly
  it('renders the input element', () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    expect(input.exists()).toBe(true)
  })

  // Test 2: Default placeholder prop is rendered
  it('renders the default placeholder text', () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    expect(input.attributes('placeholder')).toBe('What needs to be done?')
  })

  // Test 3: Custom placeholder prop is rendered
  it('renders a custom placeholder when the prop is provided', () => {
    const customPlaceholder = 'Add a new task'
    const wrapper = mount(AddTodoInput, {
      props: {
        placeholder: customPlaceholder
      }
    })
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    expect(input.attributes('placeholder')).toBe(customPlaceholder)
  })

  // Test 4: Input value is updated via v-model
  it('updates the internal text value on input', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New todo item')
    expect(wrapper.vm.text).toBe('New todo item')
  })

  // Test 5: Emits 'add' event with trimmed value on Enter key press
  it('emits an "add" event with the trimmed input value when Enter is pressed', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    
    // Set a value with leading/trailing spaces
    await input.setValue('  A new todo  ')
    await input.trigger('keydown.enter')

    // Check if the 'add' event was emitted
    expect(wrapper.emitted()).toHaveProperty('add')
    
    // Check if it was emitted exactly once
    expect(wrapper.emitted('add')).toHaveLength(1)

    // Check if the payload is the trimmed value
    expect(wrapper.emitted('add')[0]).toEqual(['A new todo'])
  })

  // Test 6: Clears the input field after emitting the 'add' event
  it('clears the input field after a successful add', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.findComponent('[data-testid="AddTodoInput"]')
    
    await input.setValue('Finish tests')
    await input.trigger('keydown.enter')
    
    // The input's DOM element value should be empty
    expect(input.element.value).toBe('')
  })

  // Test 7: Does not emit 'add' event if input is empty
  it('does not emit an "add" event if the input is empty', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    
    await input.setValue('')
    await input.trigger('keydown.enter')

    // Check that the 'add' event was not emitted
    expect(wrapper.emitted('add')).toBeUndefined()
  })

  // Test 8: Does not emit 'add' event if input contains only whitespace
  it('does not emit an "add" event if the input contains only whitespace', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    
    await input.setValue('   ') // Just spaces
    await input.trigger('keydown.enter')

    expect(wrapper.emitted('add')).toBeUndefined()
  })

  // Test 9: Does not clear input if the add event is not emitted
  it('does not clear the input if the value is only whitespace on enter', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.findComponent('[data-testid="AddTodoInput"]')
    
    await input.setValue('   ')
    await input.trigger('keydown.enter')

    // The input's DOM element value should remain unchanged
    expect(input.element.value).toBe('   ')
  })
})