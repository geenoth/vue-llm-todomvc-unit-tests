import { shallowMount } from '@vue/test-utils'
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'

describe('ToggleAllCheckbox', () => {
  it('renders correctly when allChecked is false', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').element.checked).toBe(false)
  })

  it('renders correctly when allChecked is true', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: true },
    })
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').element.checked).toBe(true)
  })

  it('emits toggleAll event on checkbox change', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'toggleAll')
    wrapper.find('[data-testid="ToggleAllCheckbox"]').trigger('change')
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(true)
  })

  it('updates allChecked prop on checkbox change', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })
    wrapper.find('[data-testid="ToggleAllCheckbox"]').trigger('change')
    expect(wrapper.vm.allChecked).toBe(true)
  })
})