import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TodoList from './05_TodoList.vue';


describe('TodoList', () => {
  const createWrapper = (props = {}) => {
    return mount(TodoList, {
      props
    })
  }

  describe('rendering', () => {
    it('should render the component with data-testid', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true)
    })

    it('should render an empty list when no todos are provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('li')).toHaveLength(0)
    })

    it('should render todos with default empty array', () => {
      const wrapper = createWrapper({})
      expect(wrapper.findAll('li')).toHaveLength(0)
    })

    it('should render a single todo item', () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      expect(wrapper.findAll('li')).toHaveLength(1)
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('Test Todo')
    })

    it('should render multiple todo items', () => {
      const todos = [
        { id: 1, title: 'First Todo', completed: false },
        { id: 2, title: 'Second Todo', completed: true },
        { id: 3, title: 'Third Todo', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      expect(wrapper.findAll('li')).toHaveLength(3)
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      expect(labels[0].text()).toBe('First Todo')
      expect(labels[1].text()).toBe('Second Todo')
      expect(labels[2].text()).toBe('Third Todo')
    })

    it('should render checkbox for each todo', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      expect(checkboxes).toHaveLength(2)
    })

    it('should render destroy button for each todo', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true }
      ]
      const wrapper = createWrapper({ todos })
      
      const buttons = wrapper.findAll('[data-testid="DestroyButton"]')
      expect(buttons).toHaveLength(2)
      expect(buttons[0].text()).toBe('×')
      expect(buttons[1].text()).toBe('×')
    })

    it('should show checkbox as checked when todo is completed', () => {
      const todos = [{ id: 1, title: 'Completed Todo', completed: true }]
      const wrapper = createWrapper({ todos })
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(true)
    })

    it('should show checkbox as unchecked when todo is not completed', () => {
      const todos = [{ id: 1, title: 'Incomplete Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(false)
    })
  })

  describe('user interactions - toggle', () => {
    it('should emit toggle event with todo id when checkbox is changed', async () => {
      const todos = [{ id: 42, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      await checkbox.trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([42])
    })

    it('should emit toggle event for correct todo when multiple todos exist', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: true },
        { id: 3, title: 'Third', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      await checkboxes[1].trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([2])
    })

    it('should emit multiple toggle events when checkbox is changed multiple times', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      await checkboxes[0].trigger('change')
      await checkboxes[1].trigger('change')
      await checkboxes[0].trigger('change')
      
      expect(wrapper.emitted('toggle')).toHaveLength(3)
      expect(wrapper.emitted('toggle')[0]).toEqual([1])
      expect(wrapper.emitted('toggle')[1]).toEqual([2])
      expect(wrapper.emitted('toggle')[2]).toEqual([1])
    })
  })

  describe('user interactions - destroy', () => {
    it('should emit destroy event with todo id when destroy button is clicked', async () => {
      const todos = [{ id: 99, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const destroyButton = wrapper.find('[data-testid="DestroyButton"]')
      await destroyButton.trigger('click')
      
      expect(wrapper.emitted('destroy')).toBeTruthy()
      expect(wrapper.emitted('destroy')[0]).toEqual([99])
    })

    it('should emit destroy event for correct todo when multiple todos exist', async () => {
      const todos = [
        { id: 10, title: 'First', completed: false },
        { id: 20, title: 'Second', completed: true },
        { id: 30, title: 'Third', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
      await destroyButtons[2].trigger('click')
      
      expect(wrapper.emitted('destroy')).toBeTruthy()
      expect(wrapper.emitted('destroy')[0]).toEqual([30])
    })

    it('should emit multiple destroy events when buttons are clicked multiple times', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
      await destroyButtons[0].trigger('click')
      await destroyButtons[1].trigger('click')
      
      expect(wrapper.emitted('destroy')).toHaveLength(2)
      expect(wrapper.emitted('destroy')[0]).toEqual([1])
      expect(wrapper.emitted('destroy')[1]).toEqual([2])
    })
  })

  describe('user interactions - edit', () => {
    it('should emit edit event with todo id when label is double-clicked', async () => {
      const todos = [{ id: 77, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const label = wrapper.find('[data-testid="TodoLabel"]')
      await label.trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toBeTruthy()
      expect(wrapper.emitted('edit')[0]).toEqual([77])
    })

    it('should emit edit event for correct todo when multiple todos exist', async () => {
      const todos = [
        { id: 100, title: 'First', completed: false },
        { id: 200, title: 'Second', completed: true },
        { id: 300, title: 'Third', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      await labels[1].trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toBeTruthy()
      expect(wrapper.emitted('edit')[0]).toEqual([200])
    })

    it('should emit multiple edit events when labels are double-clicked multiple times', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      await labels[0].trigger('dblclick')
      await labels[1].trigger('dblclick')
      await labels[0].trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toHaveLength(3)
      expect(wrapper.emitted('edit')[0]).toEqual([1])
      expect(wrapper.emitted('edit')[1]).toEqual([2])
      expect(wrapper.emitted('edit')[2]).toEqual([1])
    })

    it('should not emit edit event on single click', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const label = wrapper.find('[data-testid="TodoLabel"]')
      await label.trigger('click')
      
      expect(wrapper.emitted('edit')).toBeFalsy()
    })
  })

  describe('props reactivity', () => {
    it('should update when todos prop changes', async () => {
      const wrapper = createWrapper({ todos: [] })
      expect(wrapper.findAll('li')).toHaveLength(0)
      
      await wrapper.setProps({
        todos: [{ id: 1, title: 'New Todo', completed: false }]
      })
      
      expect(wrapper.findAll('li')).toHaveLength(1)
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('New Todo')
    })

    it('should update checkbox state when completed prop changes', async () => {
      const wrapper = createWrapper({
        todos: [{ id: 1, title: 'Test', completed: false }]
      })
      
      let checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(false)
      
      await wrapper.setProps({
        todos: [{ id: 1, title: 'Test', completed: true }]
      })
      
      checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(true)
    })

    it('should update label text when title prop changes', async () => {
      const wrapper = createWrapper({
        todos: [{ id: 1, title: 'Original Title', completed: false }]
      })
      
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('Original Title')
      
      await wrapper.setProps({
        todos: [{ id: 1, title: 'Updated Title', completed: false }]
      })
      
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('Updated Title')
    })

    it('should handle adding and removing todos', async () => {
      const wrapper = createWrapper({
        todos: [{ id: 1, title: 'First', completed: false }]
      })
      
      expect(wrapper.findAll('li')).toHaveLength(1)
      
      await wrapper.setProps({
        todos: [
          { id: 1, title: 'First', completed: false },
          { id: 2, title: 'Second', completed: false }
        ]
      })
      
      expect(wrapper.findAll('li')).toHaveLength(2)
      
      await wrapper.setProps({
        todos: [{ id: 2, title: 'Second', completed: false }]
      })
      
      expect(wrapper.findAll('li')).toHaveLength(1)
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('Second')
    })
  })

  describe('edge cases', () => {
    it('should handle todos with special characters in title', () => {
      const todos = [{ id: 1, title: '<script>alert("xss")</script>', completed: false }]
      const wrapper = createWrapper({ todos })
      
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('<script>alert("xss")</script>')
    })

    it('should handle todos with empty title', () => {
      const todos = [{ id: 1, title: '', completed: false }]
      const wrapper = createWrapper({ todos })
      
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('')
    })

    it('should handle todos with very long title', () => {
      const longTitle = 'A'.repeat(1000)
      const todos = [{ id: 1, title: longTitle, completed: false }]
      const wrapper = createWrapper({ todos })
      
      expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe(longTitle)
    })

    it('should handle todos with numeric id', () => {
      const todos = [{ id: 0, title: 'Zero ID', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      checkbox.trigger('change')
      
      expect(wrapper.emitted('toggle')[0]).toEqual([0])
    })

    it('should handle todos with string id', () => {
      const todos = [{ id: 'string-id', title: 'String ID', completed: false }]
      const wrapper = createWrapper({ todos })
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      checkbox.trigger('change')
      
      expect(wrapper.emitted('toggle')[0]).toEqual(['string-id'])
    })

    it('should handle mixed completed states', () => {
      const todos = [
        { id: 1, title: 'Incomplete', completed: false },
        { id: 2, title: 'Complete', completed: true },
        { id: 3, title: 'Also Incomplete', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      expect(checkboxes[0].element.checked).toBe(false)
      expect(checkboxes[1].element.checked).toBe(true)
      expect(checkboxes[2].element.checked).toBe(false)
    })
  })

  describe('combined interactions', () => {
    it('should handle all event types in sequence', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
      
      await checkboxes[0].trigger('change')
      await labels[1].trigger('dblclick')
      await destroyButtons[0].trigger('click')
      
      expect(wrapper.emitted('toggle')).toHaveLength(1)
      expect(wrapper.emitted('toggle')[0]).toEqual([1])
      
      expect(wrapper.emitted('edit')).toHaveLength(1)
      expect(wrapper.emitted('edit')[0]).toEqual([2])
      
      expect(wrapper.emitted('destroy')).toHaveLength(1)
      expect(wrapper.emitted('destroy')[0]).toEqual([1])
    })
  })
})