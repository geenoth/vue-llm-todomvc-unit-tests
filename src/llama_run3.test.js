import { shallowMount } from '@vue/test-utils'
import EditTodoInput from './02_EditTodoInput.vue'

describe('EditTodoInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value',
        placeholder: 'Custom placeholder'
      }
    })
    expect(wrapper.find('[data-testid="EditTodoInput"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="EditTodoInput"]').attributes('placeholder')).toBe('Custom placeholder')
    expect(wrapper.find('[data-testid="EditTodoInput"]').element.value).toBe('Initial value')
  })

  it('updates the input field when typed', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    const inputField = wrapper.find('[data-testid="EditTodoInput"]')
    await inputField.setValue('New value')
    expect(wrapper.vm.text).toBe('New value')
  })

  it('emits "save" and "update:modelValue" events when Enter key is pressed', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    const inputField = wrapper.find('[data-testid="EditTodoInput"]')
    await inputField.setValue('New value')
    await inputField.trigger('keydown.enter')
    expect(wrapper.emitted('save')[0][0]).toBe('New value')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('New value')
  })

  it('emits "cancel" event when Esc key is pressed', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    const inputField = wrapper.find('[data-testid="EditTodoInput"]')
    await inputField.trigger('keydown.esc')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('emits "save" and "update:modelValue" events when input field is blurred', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    const inputField = wrapper.find('[data-testid="EditTodoInput"]')
    await inputField.setValue('New value')
    await inputField.trigger('blur')
    expect(wrapper.emitted('save')[0][0]).toBe('New value')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('New value')
  })

  it('uses default placeholder when not provided', () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    expect(wrapper.find('[data-testid="EditTodoInput"]').attributes('placeholder')).toBe('Edit todo')
  })

  it('updates the input field when modelValue prop changes', async () => {
    const wrapper = shallowMount(EditTodoInput, {
      props: {
        modelValue: 'Initial value'
      }
    })
    await wrapper.setProps({ modelValue: 'New model value' })
    expect(wrapper.find('[data-testid="EditTodoInput"]').element.value).toBe('New model value')
  })
})