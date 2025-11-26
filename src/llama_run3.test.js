import { shallowMount } from '@vue/test-utils'
import FilterLinkAll from './09_FilterLink_All.vue';

describe('FilterLinkAll', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkAll)
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('All')
  })

  it('has class "selected" when active is true', () => {
    const wrapper = shallowMount(FilterLinkAll, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).toContain('selected')
  })

  it('emits "select" event when clicked', () => {
    const wrapper = shallowMount(FilterLinkAll)
    const selectEvent = jest.fn()
    wrapper.vm.$on('select', selectEvent)
    wrapper.find('[data-testid="FilterLink>All"]').trigger('click')
    expect(selectEvent).toHaveBeenCalledTimes(1)
    expect(selectEvent).toHaveBeenCalledWith('all')
  })
})