import { mount } from '@vue/test-utils'
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'

/**
 * @jest-environment jsdom
 */

describe('ToggleAllCheckbox', () => {
  // Test 1: Component renders correctly
  test('renders an input checkbox', () => {
    const wrapper = mount(ToggleAllCheckbox)
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.attributes('type')).toBe('checkbox')
  })

  // Test 2: Test default prop state
  test('is unchecked by default when allChecked prop is not provided', () => {
    const wrapper = mount(ToggleAllCheckbox)
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    expect(checkbox.element.checked).toBe(false)
  })

  // Test 3: Test prop reactivity (unchecked)
  test('is unchecked when the allChecked prop is false', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    })
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    expect(checkbox.element.checked).toBe(false)
  })

  // Test 4: Test prop reactivity (checked)
  test('is checked when the allChecked prop is true', () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    })
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    expect(checkbox.element.checked).toBe(true)
  })

  // Test 5: Test user interaction and event emission (checking)
  test('emits toggleAll event with true payload when unchecked checkbox is clicked', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    })
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    
    // Simulate user checking the box
    await checkbox.setValue(true)
    
    // Check if the event was emitted
    expect(wrapper.emitted()).toHaveProperty('toggleAll')
    
    // Check the payload of the emitted event
    expect(wrapper.emitted('toggleAll')[0]).toEqual([true])
  })

  // Test 6: Test user interaction and event emission (unchecking)
  test('emits toggleAll event with false payload when checked checkbox is clicked', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: true,
      },
    })
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')

    // Simulate user unchecking the box
    await checkbox.setValue(false)

    // Check if the event was emitted
    expect(wrapper.emitted()).toHaveProperty('toggleAll')

    // Check the payload of the emitted event
    expect(wrapper.emitted('toggleAll')[0]).toEqual([false])
  })

  // Test 7: Props update correctly from parent
  test('updates its checked state when the allChecked prop changes', async () => {
    const wrapper = mount(ToggleAllCheckbox, {
      props: {
        allChecked: false,
      },
    })
    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    expect(checkbox.element.checked).toBe(false)
    
    // Simulate parent component changing the prop
    await wrapper.setProps({ allChecked: true })
    
    expect(checkbox.element.checked).toBe(true)
    
    // Simulate parent component changing the prop back
    await wrapper.setProps({ allChecked: false })

    expect(checkbox.element.checked).toBe(false)
  })
})