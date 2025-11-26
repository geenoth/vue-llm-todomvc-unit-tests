import { mount } from '@vue/test-utils'
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton', () => {
  // Test 1: Component renders correctly
  test('renders the button with correct content and attributes', () => {
    const wrapper = mount(DestroyButton)

    // Find the button using its data-testid attribute
    const button = wrapper.find('[data-testid="DestroyButton"]')

    // Assert that the button exists
    expect(button.exists()).toBe(true)

    // Assert that the button has the correct type attribute
    expect(button.attributes('type')).toBe('button')

    // Assert that the button has the correct aria-label
    expect(button.attributes('aria-label')).toBe('Delete')

    // Assert that the button displays the "×" symbol
    expect(button.text()).toBe('×')
  })

  // Test 2: Click interaction
  test('emits a "destroy" event when clicked', async () => {
    const wrapper = mount(DestroyButton)

    // Find the button
    const button = wrapper.find('[data-testid="DestroyButton"]')

    // Simulate a click event
    await button.trigger('click')

    // Assert that the 'destroy' event was emitted
    expect(wrapper.emitted()).toHaveProperty('destroy')

    // Assert that the 'destroy' event was emitted exactly once
    expect(wrapper.emitted().destroy).toHaveLength(1)
  })

  // Test 3: Snapshot test for consistent rendering
  test('matches snapshot', () => {
    const wrapper = mount(DestroyButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})