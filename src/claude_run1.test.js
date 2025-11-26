import EditTodoInput from './02_EditTodoInput.vue';
import { mount } from '@vue/test-utils'
import { defineComponent, ref, watch } from 'vue'

describe('EditTodoInput', () => {
  describe('Rendering', () => {
    it('should render an input element', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('should have the correct CSS class', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.classes()).toContain('edit-todo-input')
    })

    it('should render with default placeholder', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Edit todo')
    })

    it('should render with custom placeholder', () => {
      const wrapper = mount(EditTodoInput, {
        props: { placeholder: 'Custom placeholder' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Custom placeholder')
    })

    it('should render with empty modelValue by default', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('')
    })

    it('should render with provided modelValue', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Test todo')
    })
  })

  describe('Props', () => {
    it('should accept modelValue prop', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial value' }
      })
      expect(wrapper.props('modelValue')).toBe('Initial value')
    })

    it('should accept placeholder prop', () => {
      const wrapper = mount(EditTodoInput, {
        props: { placeholder: 'Enter text' }
      })
      expect(wrapper.props('placeholder')).toBe('Enter text')
    })

    it('should update text when modelValue prop changes', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Initial')

      await wrapper.setProps({ modelValue: 'Updated' })
      expect(input.element.value).toBe('Updated')
    })
  })

  describe('User Interactions - Input', () => {
    it('should update text value when user types', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('New todo item')
      expect(input.element.value).toBe('New todo item')
    })

    it('should handle empty input', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Existing' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('')
      expect(input.element.value).toBe('')
    })
  })

  describe('User Interactions - Enter Key', () => {
    it('should emit save event on Enter key press', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Test todo'])
    })

    it('should emit update:modelValue event on Enter key press', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test todo'])
    })

    it('should trim whitespace on save via Enter', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Trimmed todo  ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Trimmed todo'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Trimmed todo'])
    })

    it('should emit empty string for whitespace-only input on Enter', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '   ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })
  })

  describe('User Interactions - Escape Key', () => {
    it('should emit cancel event on Escape key press', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('cancel')).toHaveLength(1)
    })

    it('should not emit save event on Escape key press', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('save')).toBeFalsy()
    })
  })

  describe('User Interactions - Blur', () => {
    it('should emit save event on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Blur test'])
    })

    it('should emit update:modelValue event on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Blur test'])
    })

    it('should trim whitespace on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Blur trimmed  ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Blur trimmed'])
    })
  })

  describe('State Changes', () => {
    it('should update internal text when typing and emit on save', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('New value')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['New value'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New value'])
    })

    it('should handle null modelValue gracefully', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid Enter key presses', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Rapid test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      await input.trigger('keydown.enter')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')).toHaveLength(3)
    })

    it('should handle special characters in input', async () => {
      const specialText = '<script>alert("xss")</script>'
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: specialText }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([specialText])
    })

    it('should handle unicode characters', async () => {
      const unicodeText = '日本語テスト 🎉'
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: unicodeText }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([unicodeText])
    })

    it('should handle very long input', async () => {
      const longText = 'a'.repeat(1000)
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: longText }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([longText])
    })
  })

  describe('v-model Behavior', () => {
    it('should work as a two-way binding component', async () => {
      const Parent = defineComponent({
        components: { EditTodoInput },
        setup() {
          const todoText = ref('Initial')
          return { todoText }
        },
        template: '<EditTodoInput v-model="todoText" />'
      })
      
      const wrapper = mount(Parent)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      expect(input.element.value).toBe('Initial')
    })
  })
})