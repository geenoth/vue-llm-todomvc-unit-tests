import { mount } from '@vue/test-utils'
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton', () => {
  /**
   * @test
   */
  test('renders the component', () => {
    const wrapper = mount(DestroyButton)
    const button = wrapper.find('[data-testid="DestroyButton"]')

    // Assert that the button exists
    expect(button.exists()).toBe(true)

    // Assert the button's text content
    expect(button.text()).toBe('×')

    // Assert the aria-label for accessibility
    expect(button.attributes('aria-label')).toBe('Delete')
  })

  /**
   * @test
   */
  test('emits a "destroy" event when clicked', async () => {
    const wrapper = mount(DestroyButton)
    const button = wrapper.find('[data-testid="DestroyButton"]')

    // Trigger a click event
    await button.trigger('click')

    // Assert that the 'destroy' event was emitted
    expect(wrapper.emitted()).toHaveProperty('destroy')

    // Assert that the 'destroy' event was emitted once
    expect(wrapper.emitted().destroy).toHaveLength(1)
  })

  /**
   * @test
   */
  test('component snapshot', () => {
    const wrapper = mount(DestroyButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})