import { shallowMount } from '@vue/test-utils'
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLinkCompleted', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Completed')
  })

  it('has class "selected" when active is true', () => {
    const wrapper = shallowMount(FilterLinkCompleted, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').classes()).toContain('selected')
  })

  it('emits "select" event when clicked', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    const selectEvent = jest.fn()
    wrapper.vm.$on('select', selectEvent)
    wrapper.find('[data-testid="FilterLink_Completed"]').trigger('click')
    expect(selectEvent).toHaveBeenCalledTimes(1)
    expect(selectEvent).toHaveBeenCalledWith('completed')
  })
})