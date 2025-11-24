import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('should render input element with correct testid', () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('should render with default placeholder', () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe('What needs to be done?')
    })

    it('should render with custom placeholder', () => {
      const customPlaceholder = 'Add a new task'
      wrapper = mount(AddTodoInput, {
        props: {
          placeholder: customPlaceholder
        }
      })
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe(customPlaceholder)
    })

    it('should have add-todo-input class', () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.classes()).toContain('add-todo-input')
    })
  })

  describe('User Interactions', () => {
    it('should update v-model when typing', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('New todo item')
      
      expect(input.element.value).toBe('New todo item')
    })

    it('should emit add event with trimmed value on enter keypress', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('  Buy groceries  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual(['Buy groceries'])
    })

    it('should clear input after emitting add event', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('Clean room')
      await input.trigger('keydown.enter')
      await nextTick()
      
      expect(input.element.value).toBe('')
    })

    it('should not emit add event when input is empty', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })

    it('should not emit add event when input contains only whitespace', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })

    it('should not clear input when value is only whitespace', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(input.element.value).toBe('   ')
    })

    it('should handle multiple add operations', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('First todo')
      await input.trigger('keydown.enter')
      
      await input.setValue('Second todo')
      await input.trigger('keydown.enter')
      
      await input.setValue('Third todo')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toHaveLength(3)
      expect(wrapper.emitted('add')[0]).toEqual(['First todo'])
      expect(wrapper.emitted('add')[1]).toEqual(['Second todo'])
      expect(wrapper.emitted('add')[2]).toEqual(['Third todo'])
    })

    it('should not trigger on other key presses', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('Test todo')
      await input.trigger('keydown', { key: 'a' })
      await input.trigger('keydown', { key: 'Escape' })
      await input.trigger('keydown', { key: 'Tab' })
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })
  })

  describe('Props', () => {
    it('should accept placeholder prop as string', () => {
      wrapper = mount(AddTodoInput, {
        props: {
          placeholder: 'Enter task'
        }
      })
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Enter task')
    })

    it('should handle empty placeholder prop', () => {
      wrapper = mount(AddTodoInput, {
        props: {
          placeholder: ''
        }
      })
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe('')
    })
  })

  describe('State Changes', () => {
    it('should maintain reactive state when typing', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('T')
      expect(input.element.value).toBe('T')
      
      await input.setValue('Te')
      expect(input.element.value).toBe('Te')
      
      await input.setValue('Test')
      expect(input.element.value).toBe('Test')
    })

    it('should reset state after successful submission', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('Task to do')
      expect(input.element.value).toBe('Task to do')
      
      await input.trigger('keydown.enter')
      await nextTick()
      
      expect(input.element.value).toBe('')
    })

    it('should trim leading and trailing spaces but preserve middle spaces', async () => {
      wrapper = mount(AddTodoInput)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      
      await input.setValue('  Buy milk and eggs  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')[0]).toEqual(['Buy milk and eggs'])
    })
  })
})