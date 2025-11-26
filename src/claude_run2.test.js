import { mount } from '@vue/test-utils'
import { defineComponent, ref, watch } from 'vue'
import EditTodoInput from './02_EditTodoInput.vue';



describe('EditTodoInput', () => {
  describe('rendering', () => {
    it('should render an input element', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('should have the correct class', () => {
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

    it('should render with initial modelValue', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial value' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Initial value')
    })

    it('should render with empty string as default modelValue', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('')
    })
  })

  describe('props', () => {
    it('should accept modelValue prop', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test value' }
      })
      expect(wrapper.props('modelValue')).toBe('Test value')
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

  describe('user interactions - input', () => {
    it('should update text on user input', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('New text')
      expect(input.element.value).toBe('New text')
    })

    it('should handle multiple input changes', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('First')
      expect(input.element.value).toBe('First')
      
      await input.setValue('Second')
      expect(input.element.value).toBe('Second')
      
      await input.setValue('')
      expect(input.element.value).toBe('')
    })
  })

  describe('user interactions - Enter key', () => {
    it('should emit save event on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Test'])
    })

    it('should emit update:modelValue on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test'])
    })

    it('should trim text on save via Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Trimmed text  ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Trimmed text'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Trimmed text'])
    })

    it('should emit empty string when text is only whitespace on Enter', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '   ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })

    it('should save typed text on Enter key', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Typed value')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Typed value'])
    })
  })

  describe('user interactions - Escape key', () => {
    it('should emit cancel event on Escape key', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('cancel').length).toBe(1)
    })

    it('should not emit save event on Escape key', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('save')).toBeFalsy()
    })

    it('should emit cancel even with modified text', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Original' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Modified')
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('save')).toBeFalsy()
    })
  })

  describe('user interactions - blur', () => {
    it('should emit save event on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Blur test'])
    })

    it('should emit update:modelValue on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Blur test'])
    })

    it('should trim text on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Blur trim  ' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Blur trim'])
    })

    it('should save typed text on blur', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Typed on blur')
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')[0]).toEqual(['Typed on blur'])
    })
  })

  describe('state changes', () => {
    it('should sync internal text with modelValue changes', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial' }
      })
      
      await wrapper.setProps({ modelValue: 'Changed' })
      
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Changed')
    })

    it('should maintain internal state after user input', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Start' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('User typed')
      expect(input.element.value).toBe('User typed')
    })

    it('should handle null-like values gracefully', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
    })
  })

  describe('edge cases', () => {
    it('should handle rapid Enter key presses', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Rapid' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      await input.trigger('keydown.enter')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save').length).toBe(3)
    })

    it('should handle Enter followed by Escape', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.enter')
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('save').length).toBe(1)
      expect(wrapper.emitted('cancel').length).toBe(1)
    })

    it('should handle special characters in input', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('<script>alert("xss")</script>')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['<script>alert("xss")</script>'])
    })

    it('should handle unicode characters', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('こんにちは 🎉 émoji')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['こんにちは 🎉 émoji'])
    })

    it('should handle very long input', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      const longText = 'a'.repeat(10000)
      
      await input.setValue(longText)
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([longText])
    })
  })

  describe('v-model behavior', () => {
    it('should work as v-model with parent component', async () => {
      const ParentComponent = defineComponent({
        components: { EditTodoInput },
        setup() {
          const todoText = ref('Parent value')
          return { todoText }
        },
        template: '<EditTodoInput v-model="todoText" />'
      })
      
      const wrapper = mount(ParentComponent)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      expect(input.element.value).toBe('Parent value')
    })

    it('should update parent value on save', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Original' }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Updated')
      await input.trigger('keydown.enter')
      
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted[emitted.length - 1]).toEqual(['Updated'])
    })
  })
})