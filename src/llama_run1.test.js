import { shallowMount } from '@vue/test-utils'
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  it('renders correctly when hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: false },
    })
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBe('disabled')
    expect(wrapper.text()).toBe('Clear completed')
  })

  it('renders correctly when hasCompleted is true', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true },
    })
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ClearCompletedButton"]').attributes('disabled')).toBeUndefined()
    expect(wrapper.text()).toBe('Clear completed')
  })

  it('emits clear event on click when hasCompleted is true', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: true },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'clear')
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(emitSpy).toHaveBeenCalledTimes(1)
  })

  it('does not emit clear event on click when hasCompleted is false', () => {
    const wrapper = shallowMount(ClearCompletedButton, {
      props: { hasCompleted: false },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'clear')
    wrapper.find('[data-testid="ClearCompletedButton"]').trigger('click')
    expect(emitSpy).not.toHaveBeenCalled()
  })
})