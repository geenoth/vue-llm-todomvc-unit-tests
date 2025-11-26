import { shallowMount } from '@vue/test-utils'
import FilterLinkActive from './10_FilterLink_Active.vue';

describe('FilterLinkActive', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkActive)
    expect(wrapper.find('[data-testid="FilterLink_Active"]').exists()).toBe(true)
  })

  it('has class "selected" when props.active is true', () => {
    const wrapper = shallowMount(FilterLinkActive, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes()).toContain('selected')
  })

  it('does not have class "selected" when props.active is false', () => {
    const wrapper = shallowMount(FilterLinkActive)
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes()).not.toContain('selected')
  })

  it('emits "select" event with "active" value on click', () => {
    const wrapper = shallowMount(FilterLinkActive)
    wrapper.find('[data-testid="FilterLink_Active"]').trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')[0][0]).toBe('active')
  })
})