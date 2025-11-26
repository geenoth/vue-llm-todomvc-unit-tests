import { shallowMount } from '@vue/test-utils'
import FilterLinkActive from './10_FilterLink_Active.vue';

describe('FilterLinkActive', () => {
  it('renders correctly when active is false', () => {
    const wrapper = shallowMount(FilterLinkActive, {
      props: { active: false },
    })
    expect(wrapper.find('[data-testid="FilterLink_Active"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes()).not.toContain('selected')
  })

  it('renders correctly when active is true', () => {
    const wrapper = shallowMount(FilterLinkActive, {
      props: { active: true },
    })
    expect(wrapper.find('[data-testid="FilterLink_Active"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="FilterLink_Active"]').classes()).toContain('selected')
  })

  it('emits select event on click', () => {
    const wrapper = shallowMount(FilterLinkActive, {
      props: { active: false },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'select')
    wrapper.find('[data-testid="FilterLink_Active"]').trigger('click')
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith('active')
  })
})