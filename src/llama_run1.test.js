import { shallowMount } from '@vue/test-utils'
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'

describe('ToggleAllCheckbox', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ToggleAllCheckbox)
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').exists()).toBe(true)
  })

  it('is unchecked by default', () => {
    const wrapper = shallowMount(ToggleAllCheckbox)
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').element.checked).toBe(false)
  })

  it('is checked when props.allChecked is true', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: true }
    })
    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').element.checked).toBe(true)
  })

  it('emits "toggleAll" event on checkbox change', () => {
    const wrapper = shallowMount(ToggleAllCheckbox)
    wrapper.find('[data-testid="ToggleAllCheckbox"]').trigger('change')
    expect(wrapper.emitted('toggleAll')).toHaveLength(1)
  })

  it('emits "toggleAll" event with correct value', () => {
    const wrapper = shallowMount(ToggleAllCheckbox)
    wrapper.find('[data-testid="ToggleAllCheckbox"]').element.checked = true
    wrapper.find('[data-testid="ToggleAllCheckbox"]').trigger('change')
    expect(wrapper.emitted('toggleAll')[0][0]).toBe(true)
  })
})