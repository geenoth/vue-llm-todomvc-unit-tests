
import { shallowMount } from '@vue/test-utils'
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'

describe('TodoItemCheckbox.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })

    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('emits "change" event on checkbox change', async () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })

    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.setChecked(true)

    expect(wrapper.emitted('change')).toEqual([[true]])
  })

  it('updates checked prop when changed', async () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })

    await wrapper.setProps({ checked: true })

    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('does not emit "change" event when checked prop changes', async () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })

    await wrapper.setProps({ checked: true })

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('emits "change" event on click', async () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })

    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.trigger('click')

    expect(wrapper.emitted('change')).toEqual([[true]])
  })
})