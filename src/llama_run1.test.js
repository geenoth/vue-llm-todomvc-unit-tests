import { shallowMount } from '@vue/test-utils'
import TodoList from './05_TodoList.vue';

describe('TodoList', () => {
  it('renders correctly', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ]
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toBe(2)
  })

  it('renders todo items correctly', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ]
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    const todoItems = wrapper.findAll('li')
    expect(todoItems.at(0).find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(false)
    expect(todoItems.at(1).find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(true)
    expect(todoItems.at(0).find('[data-testid="TodoLabel"]').text()).toBe('Todo 1')
    expect(todoItems.at(1).find('[data-testid="TodoLabel"]').text()).toBe('Todo 2')
  })

  it('emits "toggle" event when checkbox is clicked', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ]
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    const toggleEvent = jest.fn()
    wrapper.vm.$on('toggle', toggleEvent)
    wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
    expect(toggleEvent).toHaveBeenCalledTimes(1)
    expect(toggleEvent).toHaveBeenCalledWith(1)
  })

  it('emits "edit" event when label is double-clicked', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ]
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    const editEvent = jest.fn()
    wrapper.vm.$on('edit', editEvent)
    wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
    expect(editEvent).toHaveBeenCalledTimes(1)
    expect(editEvent).toHaveBeenCalledWith(1)
  })

  it('emits "destroy" event when destroy button is clicked', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ]
    const wrapper = shallowMount(TodoList, {
      props: { todos }
    })
    const destroyEvent = jest.fn()
    wrapper.vm.$on('destroy', destroyEvent)
    wrapper.find('[data-testid="DestroyButton"]').trigger('click')
    expect(destroyEvent).toHaveBeenCalledTimes(1)
    expect(destroyEvent).toHaveBeenCalledWith(1)
  })
})