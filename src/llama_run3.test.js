import { shallowMount } from '@vue/test-utils'
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLinkCompleted', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Completed')
  })

  it('renders with active class when active prop is true', () => {
    const wrapper = shallowMount(FilterLinkCompleted, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_Completed"]').classes()).toContain('selected')
  })

  it('emits select event when clicked', async () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    const selectSpy = jest.fn()
    wrapper.vm.$emit = selectSpy
    await wrapper.find('[data-testid="FilterLink_Completed"]').trigger('click')
    expect(selectSpy).toHaveBeenCalledTimes(1)
    expect(selectSpy).toHaveBeenCalledWith('select', 'completed')
  })

  it('does not emit select event when not clicked', () => {
    const wrapper = shallowMount(FilterLinkCompleted)
    const selectSpy = jest.fn()
    wrapper.vm.$emit = selectSpy
    expect(selectSpy).not.toHaveBeenCalled()
  })
})