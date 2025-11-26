import { shallowMount } from '@vue/test-utils'
import TodoList from './05_TodoList.vue';

describe('TodoList.vue', () => {
  it('renders correctly', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]

    const wrapper = shallowMount(TodoList, {
      props: { todos },
    })

    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
    expect(wrapper.find('ul').children().length).toBe(2)
  })

  it('emits "toggle" event on checkbox change', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
    ]

    const wrapper = shallowMount(TodoList, {
      props: { todos },
    })

    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.setChecked(true)

    expect(wrapper.emitted('toggle')).toEqual([[1]])
  })

  it('emits "edit" event on label double click', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
    ]

    const wrapper = shallowMount(TodoList, {
      props: { todos },
    })

    const label = wrapper.find('[data-testid="TodoLabel"]')
    await label.dblclick()

    expect(wrapper.emitted('edit')).toEqual([[1]])
  })

  it('emits "destroy" event on button click', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
    ]

    const wrapper = shallowMount(TodoList, {
      props: { todos },
    })

    const button = wrapper.find('[data-testid="DestroyButton"]')
    await button.trigger('click')

    expect(wrapper.emitted('destroy')).toEqual([[1]])
  })

  it('updates todo list when props change', async () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]

    const newTodos = [
      { id: 3, title: 'Todo 3', completed: false },
      { id: 4, title: 'Todo 4', completed: true },
    ]

    const wrapper = shallowMount(TodoList, {
      props: { todos },
    })

    await wrapper.setProps({ todos: newTodos })

    expect(wrapper.find('ul').children().length).toBe(2)
  })
})