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
    it('renders input element with correct data-testid', () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('renders with default placeholder', () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe('What needs to be done?')
    })

    it('renders with custom placeholder when prop is provided', () => {
      wrapper = mount(AddTodoInput, {
        props: {
          placeholder: 'Custom placeholder text'
        }
      })
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Custom placeholder text')
    })

    it('has correct CSS class', () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      expect(input.classes()).toContain('add-todo-input')
    })
  })

  describe('User Interactions', () => {
    it('updates input value when user types', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('New todo item')
      expect(input.element.value).toBe('New todo item')
    })

    it('emits "add" event with trimmed value when Enter is pressed', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('  New todo item  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual(['New todo item'])
    })

    it('clears input after emitting "add" event', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('New todo item')
      await input.trigger('keydown.enter')
      
      expect(input.element.value).toBe('')
    })

    it('does not emit "add" event when input is empty', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })

    it('does not emit "add" event when input contains only whitespace', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeFalsy()
    })

    it('preserves input value when Enter is pressed with empty/whitespace content', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(input.element.value).toBe('   ')
    })
  })

  describe('Multiple Interactions', () => {
    it('can add multiple todos sequentially', async () => {
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
      expect(input.element.value).toBe('')
    })
  })

  describe('Edge Cases', () => {
    it('handles very long input text', async () => {
      const longText = 'a'.repeat(1000)
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue(longText)
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual([longText])
    })

    it('handles special characters', async () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;\':",./<>?'
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue(specialText)
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual([specialText])
    })

    it('trims leading and trailing whitespace but preserves internal spaces', async () => {
      const input = wrapper.find('[data-testid="AddTodoInput"]')
      await input.setValue('  Multiple   words   with   spaces  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0]).toEqual(['Multiple   words   with   spaces'])
    })
  })
})