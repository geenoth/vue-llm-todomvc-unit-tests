import { mount } from '@vue/test-utils'
import FilterLinkActive from './10_FilterLink_Active.vue'; // Assuming the component is in a file named FilterLinkActive.vue

describe('FilterLink_Active', () => {
  // Test 1: Correct rendering with default props
  test('renders correctly with default inactive state', () => {
    const wrapper = mount(FilterLinkActive)
    const link = wrapper.find('[data-testid="FilterLink_Active"]')

    // Check if the component renders
    expect(link.exists()).toBe(true)

    // Check for the correct text content
    expect(link.text()).toBe('Active')

    // Check that the 'selected' class is not applied by default
    expect(link.classes()).not.toContain('selected')
  })

  // Test 2: State change based on 'active' prop being false
  test('does not have the "selected" class when the active prop is explicitly false', () => {
    const wrapper = mount(FilterLinkActive, {
      props: {
        active: false,
      },
    })
    const link = wrapper.find('[data-testid="FilterLink_Active"]')

    // Check that the 'selected' class is not applied
    expect(link.classes('selected')).toBe(false)
  })

  // Test 3: State change based on 'active' prop being true
  test('has the "selected" class when the active prop is true', () => {
    const wrapper = mount(FilterLinkActive, {
      props: {
        active: true,
      },
    })
    const link = wrapper.find('[data-testid="FilterLink_Active"]')

    // Check that the 'selected' class is applied
    expect(link.classes()).toContain('selected')
  })

  // Test 4: User interaction (click event)
  test('emits a "select" event with "active" as payload when clicked', async () => {
    const wrapper = mount(FilterLinkActive)
    const link = wrapper.find('[data-testid="FilterLink_Active"]')

    // Trigger the click event
    await link.trigger('click')

    // Check that the 'select' event was emitted
    expect(wrapper.emitted()).toHaveProperty('select')

    // Check that the 'select' event was emitted exactly once
    expect(wrapper.emitted('select')).toHaveLength(1)

    // Check the payload of the emitted event
    expect(wrapper.emitted('select')[0]).toEqual(['active'])
  })

  // Test 5: Snapshot test for consistent rendering
  test('matches snapshot when inactive', () => {
    const wrapper = mount(FilterLinkActive)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // Test 6: Snapshot test for active state
  test('matches snapshot when active', () => {
    const wrapper = mount(FilterLinkActive, {
      props: {
        active: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})