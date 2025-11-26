import { shallowMount } from '@vue/test-utils'
import DestroyButton from './03_DestroyButton.vue'

describe('DestroyButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DestroyButton)
    expect(wrapper.find('[data-testid="DestroyButton"]').exists()).toBe(true)
  })

  it('emits "destroy" event on click', () => {
    const wrapper = shallowMount(DestroyButton)
    wrapper.find('[data-testid="DestroyButton"]').trigger('click')
    expect(wrapper.emitted('destroy')).toHaveLength(1)
  })

  it('calls onClick function on button click', () => {
    const onClickSpy = jest.spyOn(DestroyButton, 'onClick')
    const wrapper = shallowMount(DestroyButton)
    wrapper.find('[data-testid="DestroyButton"]').trigger('click')
    expect(onClickSpy).toHaveBeenCalledTimes(1)
  })
})
