import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import EditTodoInput from './02_EditTodoInput.vue'

describe('EditTodoInput', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('should render the input element', () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.exists()).toBe(true)
      expect(input.element.tagName).toBe('INPUT')
    })

    it('should have correct class', () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.classes()).toContain('edit-todo-input')
    })

    it('should display default placeholder', () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Edit todo')
    })

    it('should display custom placeholder', () => {
      wrapper = mount(EditTodoInput, {
        props: {
          placeholder: 'Custom placeholder'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.attributes('placeholder')).toBe('Custom placeholder')
    })

    it('should initialize with modelValue prop', () => {
      wrapper = mount(EditTodoInput, {
        props: {
          modelValue: 'Initial text'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('Initial text')
    })

    it('should initialize with empty string when no modelValue provided', () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      expect(input.element.value).toBe('')
    })
  })

  describe('User Interactions', () => {
    it('should update input value on user input', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('New todo text')
      
      expect(input.element.value).toBe('New todo text')
    })

    it('should emit save and update:modelValue on Enter key', async () => {
      wrapper = mount(EditTodoInput, {
        props: {
          modelValue: 'Test todo'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Updated todo')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Updated todo'])
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Updated todo'])
    })

    it('should emit cancel on Escape key', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('cancel')).toBeTruthy()
      expect(wrapper.emitted('cancel')).toHaveLength(1)
    })

    it('should emit save and update:modelValue on blur', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Blurred todo')
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['Blurred todo'])
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Blurred todo'])
    })

    it('should trim whitespace when saving', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('  todo with spaces  ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual(['todo with spaces'])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['todo with spaces'])
    })

    it('should emit empty string when saving empty input', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })

    it('should emit empty string when saving whitespace-only input', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('   ')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('save')[0]).toEqual([''])
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    })
  })

  describe('Props and State Changes', () => {
    it('should update internal text when modelValue prop changes', async () => {
      wrapper = mount(EditTodoInput, {
        props: {
          modelValue: 'Initial'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      expect(input.element.value).toBe('Initial')
      
      await wrapper.setProps({ modelValue: 'Updated' })
      await nextTick()
      
      expect(input.element.value).toBe('Updated')
    })

    it('should watch modelValue prop changes reactively', async () => {
      wrapper = mount(EditTodoInput, {
        props: {
          modelValue: 'First'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await wrapper.setProps({ modelValue: 'Second' })
      await nextTick()
      expect(input.element.value).toBe('Second')
      
      await wrapper.setProps({ modelValue: 'Third' })
      await nextTick()
      expect(input.element.value).toBe('Third')
    })

    it('should update placeholder when prop changes', async () => {
      wrapper = mount(EditTodoInput, {
        props: {
          placeholder: 'Original'
        }
      })
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      expect(input.attributes('placeholder')).toBe('Original')
      
      await wrapper.setProps({ placeholder: 'New placeholder' })
      
      expect(input.attributes('placeholder')).toBe('New placeholder')
    })

    it('should not emit cancel on save', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('Test')
      await input.trigger('keydown.enter')
      
      expect(wrapper.emitted('cancel')).toBeFalsy()
    })

    it('should not emit save or update:modelValue on cancel', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.trigger('keydown.esc')
      
      expect(wrapper.emitted('save')).toBeFalsy()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('should handle multiple save operations', async () => {
      wrapper = mount(EditTodoInput)
      const input = wrapper.find('[data-testid="EditTodoInput"]')
      
      await input.setValue('First')
      await input.trigger('keydown.enter')
      
      await input.setValue('Second')
      await input.trigger('blur')
      
      expect(wrapper.emitted('save')).toHaveLength(2)
      expect(wrapper.emitted('save')[0]).toEqual(['First'])
      expect(wrapper.emitted('save')[1]).toEqual(['Second'])
    })
  })
})