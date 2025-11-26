import { mount } from '@vue/test-utils'
import TodoList from './05_TodoList.vue'; // Assuming the component is in the same directory

describe('TodoList.vue', () => {
  let wrapper
  const todos = [
    { id: 1, title: 'Learn Vue', completed: false },
    { id: 2, title: 'Learn Jest', completed: true },
    { id: 3, title: 'Build something awesome', completed: false }
  ]

  const createComponent = (props) => {
    wrapper = mount(TodoList, {
      props: {
        todos,
        ...props
      }
    })
  }

  it('renders the component root', () => {
    createComponent()
    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
  })

  it('renders an empty list when no todos are provided', () => {
    createComponent({ todos: [] })
    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(0)
  })

  it('renders the correct number of todo items', () => {
    createComponent()
    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(todos.length)
  })

  it('renders todo items with correct titles', () => {
    createComponent()
    const labels = wrapper.findAll('[data-testid="TodoLabel"]')
    expect(labels[0].text()).toBe('Learn Vue')
    expect(labels[1].text()).toBe('Learn Jest')
    expect(labels[2].text()).toBe('Build something awesome')
  })

  it('renders checkboxes with correct checked state', () => {
    createComponent()
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
    expect(checkboxes[0].element.checked).toBe(false)
    expect(checkboxes[1].element.checked).toBe(true)
    expect(checkboxes[2].element.checked).toBe(false)
  })

  it('emits a "toggle" event with the correct id when a checkbox is changed', async () => {
    createComponent()
    const firstCheckbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
    await firstCheckbox.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted().toggle[0]).toEqual([1])
  })

  it('emits a "destroy" event with the correct id when the destroy button is clicked', async () => {
    createComponent()
    const thirdDestroyButton = wrapper.findAll('[data-testid="DestroyButton"]')[2]
    await thirdDestroyButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('destroy')
    expect(wrapper.emitted().destroy[0]).toEqual([3])
  })

  it('emits an "edit" event with the correct id when a label is double-clicked', async () => {
    createComponent()
    const secondLabel = wrapper.findAll('[data-testid="TodoLabel"]')[1]
    await secondLabel.trigger('dblclick')

    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted().edit[0]).toEqual([2])
  })
})