import { shallowMount } from '@vue/test-utils'
import FilterLinkAll from './09_FilterLink_All.vue';

describe('FilterLinkAll', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkAll)
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true)
  })

  it('has class "selected" when props.active is true', () => {
    const wrapper = shallowMount(FilterLinkAll, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).toContain('selected')
  })

  it('does not have class "selected" when props.active is false', () => {
    const wrapper = shallowMount(FilterLinkAll)
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected')
  })

  it('emits "select" event with "all" value on click', () => {
    const wrapper = shallowMount(FilterLinkAll)
    wrapper.find('[data-testid="FilterLink_All"]').trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')[0][0]).toBe('all')
  })
})