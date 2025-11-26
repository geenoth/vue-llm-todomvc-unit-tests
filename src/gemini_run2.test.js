import { mount } from '@vue/test-utils'
import FilterLinkActive from './10_FilterLink_Active.vue'

describe('FilterLink_Active', () => {
  // 1. Test correct rendering
  test('renders the link with correct text', () => {
    const wrapper = mount(FilterLinkActive)
    const link = wrapper.find('[data-testid="FilterLink_Active"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Active')
  })

  // 2. Test state changes and props
  test('does not have "selected" class when "active" prop is false', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: false }
    })
    const link = wrapper.find('[data-testid="FilterLink_Active"]')
    expect(link.classes()).not.toContain('selected')
  })

  test('does not have "selected" class by default', () => {
    const wrapper = mount(FilterLinkActive)
    const link = wrapper.find('[data-testid="FilterLink_Active"]')
    expect(link.classes()).not.toContain('selected')
  })

  test('has "selected" class when "active" prop is true', () => {
    const wrapper = mount(FilterLinkActive, {
      props: { active: true }
    })
    const link = wrapper.find('[data-testid="FilterLink_Active"]')
    expect(link.classes()).toContain('selected')
  })

  // 3. Test all user interactions
  test('emits "select" event with "active" payload on click', async () => {
    const wrapper = mount(FilterLinkActive)
    const link = wrapper.find('[data-testid="FilterLink_Active"]')

    await link.trigger('click')

    // Check that the event was emitted
    expect(wrapper.emitted()).toHaveProperty('select')
    
    // Check the payload of the event
    expect(wrapper.emitted('select')[0]).toEqual(['active'])
  })

  test('snapshot test for consistent rendering', () => {
    const wrapper = mount(FilterLinkActive)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot test for active state', () => {
    const wrapper = mount(FilterLinkActive, {
        props: { active: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})