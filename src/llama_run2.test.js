import { shallowMount } from '@vue/test-utils'
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'

describe('TodoItemCheckbox', () => {
  it('renders correctly when checked is false', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(false)
  })

  it('renders correctly when checked is true', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: true },
    })
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(true)
  })

  it('emits change event on checkbox change', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'change')
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(true)
  })

  it('updates checked prop on checkbox change', () => {
    const wrapper = shallowMount(TodoItemCheckbox, {
      props: { checked: false },
    })
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(wrapper.vm.checked).toBe(true)
  })
})