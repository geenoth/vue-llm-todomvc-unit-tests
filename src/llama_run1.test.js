import { shallowMount } from '@vue/test-utils'
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLinkCompleted', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').exists()).toBe(true)
  })

  it('has class "selected" when props.active is true', () => {
    const wrapper = shallowMount(FilterLinkCompleted, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').classes()).toContain('selected')
  })

  it('does not have class "selected" when props.active is false', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').classes()).not.toContain('selected')
  })

  it('emits "select" event with "completed" value on click', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    wrapper.find('[data-testid="FilterLink_Completed"]').trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')[0][0]).toBe('completed')
  })
})