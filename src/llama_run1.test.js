import { shallowMount } from '@vue/test-utils'
import FilterLinkActive from './10_FilterLink_Active.vue';

describe('FilterLinkActive', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkActive)
    expect(wrapper.find('[data-testid="FilterLink_Active"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Active')
  })

  it('has class "selected" when active is true', () => {
    const wrapper = shallowMount(FilterLinkActive, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes()).toContain('selected')
  })

  it('emits "select" event when clicked', () => {
    const wrapper = shallowMount(FilterLinkActive)
    const selectEvent = jest.fn()
    wrapper.vm.$on('select', selectEvent)
    wrapper.find('[data-testid="FilterLink_Active"]').trigger('click')
    expect(selectEvent).toHaveBeenCalledTimes(1)
    expect(selectEvent).toHaveBeenCalledWith('active')
  })
})