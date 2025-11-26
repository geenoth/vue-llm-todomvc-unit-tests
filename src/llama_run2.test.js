import { shallowMount } from '@vue/test-utils'
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DestroyButton)
    expect(wrapper.find('[data-testid="DestroyButton"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('×')
  })

  it('emits destroy event on click', () => {
    const wrapper = shallowMount(DestroyButton)
    const emitSpy = jest.spyOn(wrapper.emitted(), 'destroy')
    wrapper.find('[data-testid="DestroyButton"]').trigger('click')
    expect(emitSpy).toHaveBeenCalledTimes(1)
  })
})