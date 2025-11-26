import { mount } from '@vue/test-utils'
import FilterLinkAll from './09_FilterLink_All.vue'

describe('FilterLink_All', () => {
  let wrapper

  const createComponent = (props = {}) => {
    wrapper = mount(FilterLinkAll, { props })
  }

  it('should render the link with the text "All"', () => {
    createComponent()
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('All')
  })

  it('should not have the "selected" class by default', () => {
    createComponent()
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    expect(link.classes()).not.toContain('selected')
  })

  it('should not have the "selected" class when the "active" prop is false', () => {
    createComponent({ active: false })
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    expect(link.classes()).not.toContain('selected')
  })

  it('should have the "selected" class when the "active" prop is true', () => {
    createComponent({ active: true })
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    expect(link.classes()).toContain('selected')
  })

  it('should emit a "select" event with the payload "all" when clicked', async () => {
    createComponent()
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    await link.trigger('click')

    // Check that the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select')

    // Check that the 'select' event was emitted exactly once
    expect(wrapper.emitted('select')).toHaveLength(1)

    // Check the payload of the emitted event
    expect(wrapper.emitted('select')[0]).toEqual(['all'])
  })

  it('should update the "selected" class when the "active" prop changes', async () => {
    createComponent({ active: false })
    const link = wrapper.find('[data-testid="FilterLink_All"]')
    expect(link.classes()).not.toContain('selected')

    // Update the prop
    await wrapper.setProps({ active: true })
    expect(link.classes()).toContain('selected')

    // Update the prop again
    await wrapper.setProps({ active: false })
    expect(link.classes()).not.toContain('selected')
  })
})