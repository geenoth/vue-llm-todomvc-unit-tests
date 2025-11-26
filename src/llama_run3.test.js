import { shallowMount } from '@vue/test-utils'
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'

describe('ToggleAllCheckbox.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    expect(wrapper.find('[data-testid="ToggleAllCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('emits "toggleAll" event on checkbox change', async () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    await checkbox.setChecked(true)

    expect(wrapper.emitted('toggleAll')).toEqual([[true]])
  })

  it('updates allChecked prop when changed', async () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    await wrapper.setProps({ allChecked: true })

    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('does not emit "toggleAll" event when allChecked prop changes', async () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    await wrapper.setProps({ allChecked: true })

    expect(wrapper.emitted('toggleAll')).toBeUndefined()
  })

  it('emits "toggleAll" event on click', async () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    await checkbox.trigger('click')

    expect(wrapper.emitted('toggleAll')).toEqual([[true]])
  })

  it('emits "toggleAll" event on keypress', async () => {
    const wrapper = shallowMount(ToggleAllCheckbox, {
      props: { allChecked: false },
    })

    const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]')
    await checkbox.trigger('keydown', { key: ' ' })

    expect(wrapper.emitted('toggleAll')).toEqual([[true]])
  })
})