import { mount } from '@vue/test-utils'
import TodoList from './05_TodoList.vue'; // Assuming the component is in the same directory

describe('TodoList.vue', () => {
  let wrapper
  const todos = [
    { id: 1, title: 'Learn Vue', completed: true },
    { id: 2, title: 'Learn Jest', completed: false },
    { id: 3, title: 'Build something awesome', completed: false }
  ]

  const createComponent = (propsData) => {
    wrapper = mount(TodoList, {
      props: {
        ...propsData
      }
    })
  }

  it('renders correctly with default empty props', () => {
    createComponent()
    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
    expect(wrapper.findAll('li')).toHaveLength(0)
  })

  it('renders a list of todos correctly', () => {
    createComponent({ todos })
    const todoItems = wrapper.findAll('li')
    expect(todoItems).toHaveLength(todos.length)
  })

  it('renders todo titles correctly', () => {
    createComponent({ todos })
    const labels = wrapper.findAll('[data-testid="TodoLabel"]')
    expect(labels[0].text()).toBe('Learn Vue')
    expect(labels[1].text()).toBe('Learn Jest')
    expect(labels[2].text()).toBe('Build something awesome')
  })

  it('renders checkbox states correctly based on todo completion', () => {
    createComponent({ todos })
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
    expect(checkboxes[0].element.checked).toBe(true)
    expect(checkboxes[1].element.checked).toBe(false)
    expect(checkboxes[2].element.checked).toBe(false)
  })

  it('emits a "toggle" event with the correct todo id when a checkbox is clicked', async () => {
    createComponent({ todos })
    const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await checkbox.trigger('change')
    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted().toggle[0]).toEqual([todos[0].id])
  })

  it('emits a "toggle" event for the second item when its checkbox is clicked', async () => {
    createComponent({ todos })
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
    await checkboxes[1].trigger('change')
    expect(wrapper.emitted().toggle[0]).toEqual([todos[1].id])
  })

  it('emits a "destroy" event with the correct todo id when the destroy button is clicked', async () => {
    createComponent({ todos })
    const destroyButton = wrapper.find('[data-testid="DestroyButton"]')
    await destroyButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('destroy')
    expect(wrapper.emitted().destroy[0]).toEqual([todos[0].id])
  })

  it('emits a "destroy" event for the third item when its destroy button is clicked', async () => {
    createComponent({ todos })
    const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
    await destroyButtons[2].trigger('click')
    expect(wrapper.emitted().destroy[0]).toEqual([todos[2].id])
  })

  it('emits an "edit" event with the correct todo id when a label is double-clicked', async () => {
    createComponent({ todos })
    const label = wrapper.find('[data-testid="TodoLabel"]')
    await label.trigger('dblclick')
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted().edit[0]).toEqual([todos[0].id])
  })

  it('emits an "edit" event for the second item when its label is double-clicked', async () => {
    createComponent({ todos })
    const labels = wrapper.findAll('[data-testid="TodoLabel"]')
    await labels[1].trigger('dblclick')
    expect(wrapper.emitted().edit[0]).toEqual([todos[1].id])
  })
})