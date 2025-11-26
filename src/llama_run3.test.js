import { shallowMount } from '@vue/test-utils'
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'

describe('TodoItemCheckbox', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TodoItemCheckbox)
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').exists()).toBe(true)
  })

  it('is unchecked by default', () => {
    const wrapper = shallowMount(TodoItemCheckbox)
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(false)
  })

  it('is checked when props.checked is true', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: true }
    })
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(true)
  })

  it('emits "change" event on checkbox change', () => {
    const wrapper = shallowMount(TodoItemCheckbox)
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(wrapper.emitted('change')).toHaveLength(1)
  })

  it('emits "change" event with correct value', () => {
    const wrapper = shallowMount(TodoItemCheckbox)
    wrapper.find('[data-testid="TodoItemCheckbox"]').element.checked = true
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(wrapper.emitted('change')[0][0]).toBe(true)
  })
})