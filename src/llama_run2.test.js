import { shallowMount } from '@vue/test-utils'
import FilterLinkAll from './09_FilterLink_All.vue';

describe('FilterLinkAll', () => {
  it('renders correctly when active is false', () => {
    const wrapper = shallowMount(FilterLinkAll, {
      props: { active: false },
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected')
  })

  it('renders correctly when active is true', () => {
    const wrapper = shallowMount(FilterLinkAll, {
      props: { active: true },
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).toContain('selected')
  })

  it('emits select event on click', () => {
    const wrapper = shallowMount(FilterLinkAll, {
      props: { active: false },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'select')
    wrapper.find('[data-testid="FilterLink_All"]').trigger('click')
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith('all')
  })
})