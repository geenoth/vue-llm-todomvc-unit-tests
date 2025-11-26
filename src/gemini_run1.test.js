import { mount } from '@vue/test-utils'
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'

describe('TodoItemCheckbox.vue', () => {
  // Test 1: Renders the checkbox input element
  test('renders a checkbox input', () => {
    const wrapper = mount(TodoItemCheckbox)
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.attributes('type')).toBe('checkbox')
  })

  // Test 2: Renders unchecked by default
  test('is unchecked by default', () => {
    const wrapper = mount(TodoItemCheckbox)
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    expect(checkbox.element.checked).toBe(false)
  })

  // Test 3: Renders correctly with the 'checked' prop set to false
  test('is unchecked when the "checked" prop is false', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false
      }
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    expect(checkbox.element.checked).toBe(false)
  })

  // Test 4: Renders correctly with the 'checked' prop set to true
  test('is checked when the "checked" prop is true', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: true
      }
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    expect(checkbox.element.checked).toBe(true)
  })

  // Test 5: Emits a 'change' event with the new value (true) when an unchecked box is clicked
  test('emits "change" event with true payload when unchecked box is clicked', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false
      }
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.setValue(true) // Simulates user checking the box

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toEqual([true])
  })

  // Test 6: Emits a 'change' event with the new value (false) when a checked box is clicked
  test('emits "change" event with false payload when checked box is clicked', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: true
      }
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.setValue(false) // Simulates user unchecking the box

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toEqual([false])
  })
})