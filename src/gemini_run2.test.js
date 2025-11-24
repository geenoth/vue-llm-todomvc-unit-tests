import { mount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput', () => {
  // Test 1: Correct Rendering with default props
  it('renders the input element with the default placeholder', () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')

    // Check if the input element exists
    expect(input.exists()).toBe(true)

    // Check if the default placeholder is correct
    expect(input.attributes('placeholder')).toBe('What needs to be done?')
  })

  // Test 2: Correctly accepts and displays a custom placeholder prop
  it('renders with a custom placeholder when passed as a prop', () => {
    const customPlaceholder = 'Add a new task'
    const wrapper = mount(AddTodoInput, {
      props: {
        placeholder: customPlaceholder
      }
    })
    const input = wrapper.find('[data-testid="AddTodoInput"]')

    // Check if the custom placeholder is rendered
    expect(input.attributes('placeholder')).toBe(customPlaceholder)
  })

  // Test 3: Test user input and state update
  it('updates the internal text value on user input', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')

    // Simulate user typing
    await input.setValue('New todo item')

    // Check if the input's value has been updated
    expect(input.element.value).toBe('New todo item')
  })

  // Test 4: Test 'add' event emission on Enter keypress with valid text
  it('emits an "add" event with the trimmed input value when Enter is pressed', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    const inputText = '  Learn Vue Testing  '

    // Simulate user typing
    await input.setValue(inputText)

    // Simulate pressing the Enter key
    await input.trigger('keydown.enter')

    // Check if the 'add' event was emitted
    expect(wrapper.emitted()).toHaveProperty('add')

    // Check if the event was emitted once
    expect(wrapper.emitted().add).toHaveLength(1)

    // Check if the payload is the trimmed value
    expect(wrapper.emitted().add[0]).toEqual([inputText.trim()])
  })

  // Test 5: Test input clearing after event emission
  it('clears the input field after emitting an "add" event', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')

    // Simulate user typing and pressing Enter
    await input.setValue('A valid todo')
    await input.trigger('keydown.enter')

    // Check if the input value is cleared
    expect(input.element.value).toBe('')
  })

  // Test 6: Test behavior with empty input
  it('does not emit an "add" event if the input is empty when Enter is pressed', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')

    // Ensure input is empty
    await input.setValue('')

    // Simulate pressing Enter
    await input.trigger('keydown.enter')

    // Check that no 'add' event was emitted
    expect(wrapper.emitted().add).toBeUndefined()
  })

  // Test 7: Test behavior with whitespace-only input
  it('does not emit an "add" event if the input contains only whitespace', async () => {
    const wrapper = mount(AddTodoInput)
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    const whitespaceText = '   '

    // Set value to only whitespace
    await input.setValue(whitespaceText)

    // Simulate pressing Enter
    await input.trigger('keydown.enter')

    // Check that no 'add' event was emitted
    expect(wrapper.emitted().add).toBeUndefined()

    // The input should not be cleared since no event was emitted
    expect(input.element.value).toBe(whitespaceText)
  })
})