import { shallowMount } from '@vue/test-utils'
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ClearCompletedButton)
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').exists()).toBe(true)
  })

  it('is disabled when hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton)
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBe('disabled')
  })

  it('is enabled when hasCompleted is true', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true }
    })
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeUndefined()
  })

  it('emits "clear" event on click when hasCompleted is true', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true }
    })
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('does not emit "clear" event on click when hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton)
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(wrapper.emitted('clear')).toBeUndefined()
  })
})