import { mount } from '@vue/test-utils'
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'

/**
 * @jest-environment jsdom
 */

describe('TodoItemCheckbox', () => {
  // 1. Test correct rendering with default props
  it('should render an unchecked checkbox by default', () => {
    const wrapper = mount(TodoItemCheckbox)
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.element.checked).toBe(false)
  })

  // 2. Test state changes and props: checked=true
  it('should render a checked checkbox when the "checked" prop is true', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: true,
      },
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    
    expect(checkbox.element.checked).toBe(true)
  })

  // 3. Test state changes and props: checked=false
  it('should render an unchecked checkbox when the "checked" prop is false', () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false,
      },
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    
    expect(checkbox.element.checked).toBe(false)
  })

  // 4. Test user interactions: clicking an unchecked checkbox
  it('should emit a "change" event with a value of true when an unchecked checkbox is clicked', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: false,
      },
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')

    // Simulate user checking the box
    await checkbox.setValue(true)

    // Verify the emitted event
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toEqual([true])
  })

  // 5. Test user interactions: clicking a checked checkbox
  it('should emit a "change" event with a value of false when a checked checkbox is clicked', async () => {
    const wrapper = mount(TodoItemCheckbox, {
      props: {
        checked: true,
      },
    })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    
    // Simulate user unchecking the box
    await checkbox.setValue(false)

    // Verify the emitted event
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toEqual([false])
  })
})