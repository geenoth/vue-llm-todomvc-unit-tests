/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddTodoInput)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {
    it('should render the input element', () => {
      expect(wrapper.find('[data-testid="AddTodoInput"]').exists()).toBe(true)
    })

    it('should render with default placeholder', () => {
      expect(wrapper.find('input').attributes('placeholder')).toBe('What needs to be done?')
    })

    it('should render with custom placeholder', () => {
      wrapper = mount(AddTodoInput, {
        props: {
          placeholder: 'Custom placeholder text'
        }
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder text')
    })

    it('should have the correct CSS class', () => {
      expect(wrapper.find('input').classes()).toContain('add-todo-input')
    })
  })

  describe('User interactions', () => {
    it('should update input value when typing', async () => {
      const input = wrapper.find('input')
      await input.setValue('New todo item')
      expect(input.element.value).toBe('New todo item')
    })

    it('should emit "add" event with trimmed value when Enter is pressed', async () => {
      const input = wrapper.find('input')
      await input.setValue('  New todo item  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual(['New todo item'])
    })

    it('should clear input after emitting "add" event', async () => {
      const input = wrapper.find('input')
      await input.setValue('New todo item')
      await input.trigger('keydown.enter')
      
      expect(input.element.value).toBe('')
    })

    it('should not emit "add" event when Enter is pressed with empty input', async () => {
      const input = wrapper.find('input')
      await input.setValue('')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })

    it('should not emit "add" event when Enter is pressed with only whitespace', async () => {
      const input = wrapper.find('input')
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
      expect(input.element.value).toBe('   ')
    })

    it('should handle multiple todo additions', async () => {
      const input = wrapper.find('input')
      
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
      expect(input.element.value).toBe('')
    })
  })

  describe('v-model behavior', () => {
    it('should support two-way data binding', async () => {
      const input = wrapper.find('input')
      
      await input.setValue('Test value')
      expect(input.element.value).toBe('Test value')
      
      await input.setValue('Updated value')
      expect(input.element.value).toBe('Updated value')
    })
  })

  describe('Edge cases', () => {
    it('should handle special characters in input', async () => {
      const input = wrapper.find('input')
      await input.setValue('Todo with @#$%^&*() special chars')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')[0]).toEqual(['Todo with @#$%^&*() special chars'])
    })

    it('should handle very long input', async () => {
      const input = wrapper.find('input')
      const longText = 'A'.repeat(1000)
      await input.setValue(longText)
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')[0]).toEqual([longText])
    })
  })
})