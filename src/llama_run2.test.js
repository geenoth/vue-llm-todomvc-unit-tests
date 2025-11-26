import { shallowMount } from '@vue/test-utils'
import TodoList from './05_TodoList.vue';

describe('TodoList', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true }
  ]

  it('renders correctly', () => {
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
  })

  it('renders todo items correctly', () => {
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    expect(wrapper.findAll('[data-testid="TodoItemCheckbox"]').length).toBe(2)
    expect(wrapper.findAll('[data-testid="TodoLabel"]').length).toBe(2)
    expect(wrapper.findAll('[data-testid="DestroyButton"]').length).toBe(2)
  })

  it('emits "toggle" event on checkbox change', () => {
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(wrapper.emitted('toggle')).toHaveLength(1)
  })

  it('emits "edit" event on label double click', () => {
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
    expect(wrapper.emitted('edit')).toHaveLength(1)
  })

  it('emits "destroy" event on button click', () => {
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    wrapper.find('[data-testid="DestroyButton"]').trigger('click')
    expect(wrapper.emitted('destroy')).toHaveLength(1)
  })
})