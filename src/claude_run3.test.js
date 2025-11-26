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

    it('should render an empty list when todos prop is an empty array', () => {
      const wrapper = createWrapper({ todos: [] })
      expect(wrapper.findAll('li')).toHaveLength(0)
    })

    it('should render the correct number of todo items', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      expect(wrapper.findAll('li')).toHaveLength(3)
    })

    it('should render todo titles correctly', () => {
      const todos = [
        { id: 1, title: 'First Todo', completed: false },
        { id: 2, title: 'Second Todo', completed: true }
      ]
      const wrapper = createWrapper({ todos })
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      expect(labels[0].text()).toBe('First Todo')
      expect(labels[1].text()).toBe('Second Todo')
    })

    it('should render checkbox with correct checked state for incomplete todo', () => {
      const todos = [{ id: 1, title: 'Incomplete', completed: false }]
      const wrapper = createWrapper({ todos })
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(false)
    })

    it('should render checkbox with correct checked state for completed todo', () => {
      const todos = [{ id: 1, title: 'Completed', completed: true }]
      const wrapper = createWrapper({ todos })
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(true)
    })

    it('should render destroy button for each todo', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true }
      ]
      const wrapper = createWrapper({ todos })
      const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
      expect(destroyButtons).toHaveLength(2)
      expect(destroyButtons[0].text()).toBe('×')
      expect(destroyButtons[1].text()).toBe('×')
    })

    it('should render all required elements for each todo item', () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      const li = wrapper.find('li')
      expect(li.find('[data-testid="TodoItemCheckbox"]').exists()).toBe(true)
      expect(li.find('[data-testid="TodoLabel"]').exists()).toBe(true)
      expect(li.find('[data-testid="DestroyButton"]').exists()).toBe(true)
    })
  })

  describe('toggle interaction', () => {
    it('should emit toggle event with todo id when checkbox is changed', async () => {
      const todos = [{ id: 42, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      
      await checkbox.trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([42])
    })

    it('should emit toggle event for completed todo', async () => {
      const todos = [{ id: 99, title: 'Completed Todo', completed: true }]
      const wrapper = createWrapper({ todos })
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      
      await checkbox.trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([99])
    })

    it('should emit toggle event with correct id for specific todo in list', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false },
        { id: 3, title: 'Third', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      
      await checkboxes[1].trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([2])
    })

    it('should emit multiple toggle events for multiple interactions', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      
      await checkboxes[0].trigger('change')
      await checkboxes[1].trigger('change')
      
      expect(wrapper.emitted('toggle')).toHaveLength(2)
      expect(wrapper.emitted('toggle')[0]).toEqual([1])
      expect(wrapper.emitted('toggle')[1]).toEqual([2])
    })
  })

  describe('destroy interaction', () => {
    it('should emit destroy event with todo id when destroy button is clicked', async () => {
      const todos = [{ id: 55, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      const destroyButton = wrapper.find('[data-testid="DestroyButton"]')
      
      await destroyButton.trigger('click')
      
      expect(wrapper.emitted('destroy')).toBeTruthy()
      expect(wrapper.emitted('destroy')[0]).toEqual([55])
    })

    it('should emit destroy event with correct id for specific todo in list', async () => {
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

    it('should emit multiple destroy events for multiple clicks', async () => {
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

  describe('edit interaction', () => {
    it('should emit edit event with todo id when label is double-clicked', async () => {
      const todos = [{ id: 77, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      
      await label.trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toBeTruthy()
      expect(wrapper.emitted('edit')[0]).toEqual([77])
    })

    it('should emit edit event with correct id for specific todo in list', async () => {
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

    it('should emit multiple edit events for multiple double-clicks', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      
      await labels[0].trigger('dblclick')
      await labels[1].trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toHaveLength(2)
      expect(wrapper.emitted('edit')[0]).toEqual([1])
      expect(wrapper.emitted('edit')[1]).toEqual([2])
    })

    it('should not emit edit event on single click', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      
      await label.trigger('click')
      
      expect(wrapper.emitted('edit')).toBeFalsy()
    })
  })

  describe('props handling', () => {
    it('should use default empty array when todos prop is not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('li')).toHaveLength(0)
    })

    it('should update rendering when todos prop changes', async () => {
      const wrapper = createWrapper({ todos: [{ id: 1, title: 'Initial', completed: false }] })
      expect(wrapper.findAll('li')).toHaveLength(1)
      
      await wrapper.setProps({
        todos: [
          { id: 1, title: 'First', completed: false },
          { id: 2, title: 'Second', completed: true }
        ]
      })
      
      expect(wrapper.findAll('li')).toHaveLength(2)
    })

    it('should reflect updated todo completion status', async () => {
      const wrapper = createWrapper({ todos: [{ id: 1, title: 'Test', completed: false }] })
      let checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(false)
      
      await wrapper.setProps({ todos: [{ id: 1, title: 'Test', completed: true }] })
      
      checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]')
      expect(checkbox.element.checked).toBe(true)
    })

    it('should reflect updated todo title', async () => {
      const wrapper = createWrapper({ todos: [{ id: 1, title: 'Original Title', completed: false }] })
      let label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe('Original Title')
      
      await wrapper.setProps({ todos: [{ id: 1, title: 'Updated Title', completed: false }] })
      
      label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe('Updated Title')
    })
  })

  describe('mixed interactions', () => {
    it('should handle toggle, edit, and destroy on same todo', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      await wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
      await wrapper.find('[data-testid="DestroyButton"]').trigger('click')
      
      expect(wrapper.emitted('toggle')).toHaveLength(1)
      expect(wrapper.emitted('toggle')[0]).toEqual([1])
      expect(wrapper.emitted('edit')).toHaveLength(1)
      expect(wrapper.emitted('edit')[0]).toEqual([1])
      expect(wrapper.emitted('destroy')).toHaveLength(1)
      expect(wrapper.emitted('destroy')[0]).toEqual([1])
    })

    it('should handle interactions on multiple different todos', async () => {
      const todos = [
        { id: 1, title: 'First', completed: false },
        { id: 2, title: 'Second', completed: true },
        { id: 3, title: 'Third', completed: false }
      ]
      const wrapper = createWrapper({ todos })
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]')
      const labels = wrapper.findAll('[data-testid="TodoLabel"]')
      const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]')
      
      await checkboxes[0].trigger('change')
      await labels[1].trigger('dblclick')
      await destroyButtons[2].trigger('click')
      
      expect(wrapper.emitted('toggle')[0]).toEqual([1])
      expect(wrapper.emitted('edit')[0]).toEqual([2])
      expect(wrapper.emitted('destroy')[0]).toEqual([3])
    })
  })

  describe('edge cases', () => {
    it('should handle todo with special characters in title', () => {
      const todos = [{ id: 1, title: '<script>alert("xss")</script>', completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe('<script>alert("xss")</script>')
    })

    it('should handle todo with empty title', () => {
      const todos = [{ id: 1, title: '', completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe('')
    })

    it('should handle todo with very long title', () => {
      const longTitle = 'A'.repeat(1000)
      const todos = [{ id: 1, title: longTitle, completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe(longTitle)
    })

    it('should handle todo with unicode characters', () => {
      const todos = [{ id: 1, title: '日本語 🎉 émoji', completed: false }]
      const wrapper = createWrapper({ todos })
      const label = wrapper.find('[data-testid="TodoLabel"]')
      expect(label.text()).toBe('日本語 🎉 émoji')
    })

    it('should handle large number of todos', () => {
      const todos = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Todo ${i + 1}`,
        completed: i % 2 === 0
      }))
      const wrapper = createWrapper({ todos })
      expect(wrapper.findAll('li')).toHaveLength(100)
    })

    it('should handle todo id as string', async () => {
      const todos = [{ id: 'string-id-123', title: 'String ID Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      await wrapper.find('[data-testid="TodoItemCheckbox"]').trigger('change')
      
      expect(wrapper.emitted('toggle')[0]).toEqual(['string-id-123'])
    })

    it('should handle todo id as negative number', async () => {
      const todos = [{ id: -5, title: 'Negative ID Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      await wrapper.find('[data-testid="DestroyButton"]').trigger('click')
      
      expect(wrapper.emitted('destroy')[0]).toEqual([-5])
    })

    it('should handle todo id as zero', async () => {
      const todos = [{ id: 0, title: 'Zero ID Todo', completed: false }]
      const wrapper = createWrapper({ todos })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
      
      expect(wrapper.emitted('edit')[0]).toEqual([0])
    })
  })
})