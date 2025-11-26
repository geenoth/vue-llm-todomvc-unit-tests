import { mount } from '@vue/test-utils'
import FilterLinkAll from './09_FilterLink_All.vue'; // Adjust the path to your component

describe('FilterLink_All', () => {
  // Test case for correct rendering with default props
  it('renders correctly with default props', () => {
    const wrapper = mount(FilterLinkAll)
    const link = wrapper.find('[data-testid="FilterLink_All"]')

    // Check if the component exists
    expect(link.exists()).toBe(true)

    // Check the text content
    expect(link.text()).toBe('All')

    // Check that the "selected" class is not applied when `active` is false (default)
    expect(link.classes('selected')).toBe(false)
  })

  // Test case for rendering when the 'active' prop is true
  it('applies the "selected" class when the "active" prop is true', () => {
    const wrapper = mount(FilterLinkAll, {
      props: {
        active: true,
      },
    })
    const link = wrapper.find('[data-testid="FilterLink_All"]')

    // Check that the "selected" class is applied
    expect(link.classes('selected')).toBe(true)
  })

  // Test case for rendering when the 'active' prop is explicitly false
  it('does not apply the "selected" class when the "active" prop is false', () => {
    const wrapper = mount(FilterLinkAll, {
      props: {
        active: false,
      },
    })
    const link = wrapper.find('[data-testid="FilterLink_All"]')

    // Check that the "selected" class is not applied
    expect(link.classes('selected')).toBe(false)
  })

  // Test case for user interaction (click event)
  it('emits a "select" event with "all" payload on click', async () => {
    const wrapper = mount(FilterLinkAll)
    const link = wrapper.find('[data-testid="FilterLink_All"]')

    // Trigger the click event
    await link.trigger('click')

    // Check if the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select')

    // Check if the emitted event has the correct payload
    expect(wrapper.emitted('select')[0]).toEqual(['all'])
  })

  // Test case to ensure the href attribute is present
  it('has an href attribute set to "#"', () => {
    const wrapper = mount(FilterLinkAll)
    const link = wrapper.find('[data-testid="FilterLink_All"]')

    // Check the href attribute
    expect(link.attributes('href')).toBe('#')
  })
})