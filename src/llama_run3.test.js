import { shallowMount } from '@vue/test-utils'
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true }
    })
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Clear completed')
  })

  it('is disabled when hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: false }
    })
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBe('disabled')
  })

  it('emits "clear" event when clicked and hasCompleted is true', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true }
    })
    const clearEvent = jest.fn()
    wrapper.vm.$on('clear', clearEvent)
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(clearEvent).toHaveBeenCalledTimes(1)
  })

  it('does not emit "clear" event when clicked and hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: false }
    })
    const clearEvent = jest.fn()
    wrapper.vm.$on('clear', clearEvent)
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(clearEvent).not.toHaveBeenCalled()
  })
})