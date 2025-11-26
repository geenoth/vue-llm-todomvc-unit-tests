import { mount } from '@vue/test-utils'
import { defineComponent, ref, watch } from 'vue'
import EditTodoInput from './02_EditTodoInput.vue'

describe('EditTodoInput', () => {
  describe('rendering', () => {
    it('renders an input element with correct data-testid', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('renders with edit-todo-input class', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.classes()).toContain('edit-todo-input')
    })

    it('renders with default placeholder', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Edit todo')
    })

    it('renders with custom placeholder', () => {
      const wrapper = mount(EditTodoInput, {
        props: { placeholder: 'Custom placeholder' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Custom placeholder')
    })

    it('renders with empty value by default', () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('')
    })

    it('renders with provided modelValue', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial text' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Initial text')
    })
  })

  describe('props', () => {
    it('accepts modelValue prop', () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test value' },
      })
      expect(wrapper.find('[data-testid="EditTodoInput"]').element.value).toBe('Test value')
    })

    it('accepts placeholder prop', () => {
      const wrapper = mount(EditTodoInput, {
        props: { placeholder: 'Enter text here' },
      })
      expect(wrapper.find('[data-testid="EditTodoInput"]').attributes('placeholder')).toBe(
        'Enter text here',
      )
    })

    it('updates internal text when modelValue prop changes', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Initial' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Initial')

      await wrapper.setProps({ modelValue: 'Updated' })
      expect(input.element.value).toBe('Updated')
    })
  })

  describe('user input', () => {
    it('updates text value when user types', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.setValue('New todo text')
      expect(input.element.value).toBe('New todo text')
    })

    it('allows clearing the input', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Existing text' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.setValue('')
      expect(input.element.value).toBe('')
    })
  })

  describe('Enter key interaction', () => {
    it('emits save event with trimmed value on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Test todo'])
    })

    it('emits update:modelValue event with trimmed value on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test todo'])
    })

    it('trims whitespace from value on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Trimmed text  ' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual(['Trimmed text'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Trimmed text'])
    })

    it('emits empty string when input is only whitespace on Enter key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '   ' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })

    it('handles empty input on Enter key', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })
  })

  describe('Escape key interaction', () => {
    it('emits cancel event on Escape key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.esc')

      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('cancel')).toHaveLength(1)
    })

    it('does not emit save event on Escape key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.esc')

      expect(wrapper.emitted('save')).toBeFalsy()
    })

    it('does not emit update:modelValue on Escape key', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Test todo' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.esc')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('blur interaction', () => {
    it('emits save event with trimmed value on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('blur')

      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Blur test'])
    })

    it('emits update:modelValue event with trimmed value on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Blur test' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('blur')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Blur test'])
    })

    it('trims whitespace from value on blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '  Trimmed on blur  ' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('blur')

      expect(wrapper.emitted('save')[0]).toEqual(['Trimmed on blur'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Trimmed on blur'])
    })

    it('handles empty input on blur', async () => {
      const wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('blur')

      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })
  })

  describe('combined interactions', () => {
    it('saves updated value after typing and pressing Enter', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Original' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.setValue('Updated text')
      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual(['Updated text'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Updated text'])
    })

    it('saves updated value after typing and blur', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Original' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.setValue('Blurred text')
      await input.trigger('blur')

      expect(wrapper.emitted('save')[0]).toEqual(['Blurred text'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Blurred text'])
    })

    it('cancels without saving after typing and pressing Escape', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'Original' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.setValue('Modified text')
      await input.trigger('keydown.esc')

      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('save')).toBeFalsy()
    })

    it('can save multiple times', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'First' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')
      await input.setValue('Second')
      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')).toHaveLength(2)
      expect(wrapper.emitted('save')[0]).toEqual(['First'])
      expect(wrapper.emitted('save')[1]).toEqual(['Second'])
    })
  })

  describe('edge cases', () => {
    it('handles null-like values gracefully', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual([''])
    })

    it('handles special characters in input', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '<script>alert("xss")</script>' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual(['<script>alert("xss")</script>'])
    })

    it('handles unicode characters', async () => {
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: '日本語テスト 🎉' },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual(['日本語テスト 🎉'])
    })

    it('handles very long strings', async () => {
      const longString = 'a'.repeat(10000)
      const wrapper = mount(EditTodoInput, {
        props: { modelValue: longString },
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')

      await input.trigger('keydown.enter')

      expect(wrapper.emitted('save')[0]).toEqual([longString])
    })
  })
})
