import { mount } from '@vue/test-utils'
import EditTodoInput from './02_EditTodoInput.vue'

describe('EditTodoInput', () => {
  // Test 1: Correct rendering with default props
  it('renders correctly with default props', () => {
    const wrapper = mount(EditTodoInput)
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    expect(input.exists()).toBe(true)
    expect(input.element.tagName).toBe('INPUT')
    expect(input.classes()).toContain('edit-todo-input')
    expect(input.element.placeholder).toBe('Edit todo')
    expect(input.element.value).toBe('')
  })

  // Test 2: Correct rendering with custom props
  it('renders correctly with custom props', () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'Initial value',
        placeholder: 'Enter new value'
      }
    })
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    expect(input.element.value).toBe('Initial value')
    expect(input.element.placeholder).toBe('Enter new value')
  })

  // Test 3: Updates input value when modelValue prop changes
  it('updates input value when modelValue prop changes', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'First'
      }
    })
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    expect(input.element.value).toBe('First')

    await wrapper.setProps({ modelValue: 'Second' })
    
    expect(input.element.value).toBe('Second')
  })

  // Test 4: Emits save and update:modelValue on Enter keydown
  it('emits save and update:modelValue on Enter keydown', async () => {
    const wrapper = mount(EditTodoInput)
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    await input.setValue('A new todo')
    await input.trigger('keydown.enter')
    
    expect(wrapper.emitted()).toHaveProperty('save')
    expect(wrapper.emitted().save[0]).toEqual(['A new todo'])
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['A new todo'])
  })

  // Test 5: Emits save and update:modelValue on blur
  it('emits save and update:modelValue on blur', async () => {
    const wrapper = mount(EditTodoInput)
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    await input.setValue('Another new todo')
    await input.trigger('blur')
    
    expect(wrapper.emitted()).toHaveProperty('save')
    expect(wrapper.emitted().save[0]).toEqual(['Another new todo'])
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Another new todo'])
  })

  // Test 6: Trims the value before emitting on save
  it('trims the value before emitting on save', async () => {
    const wrapper = mount(EditTodoInput)
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    await input.setValue('   Trim this value   ')
    await input.trigger('keydown.enter')
    
    expect(wrapper.emitted().save[0]).toEqual(['Trim this value'])
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Trim this value'])
  })
  
  // Test 7: Emits an empty string if the value is only whitespace on save
  it('emits an empty string if the value is only whitespace on save', async () => {
    const wrapper = mount(EditTodoInput, {
        props: { modelValue: 'some value' }
    })
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    await input.setValue('    ')
    await input.trigger('keydown.enter')
    
    expect(wrapper.emitted().save[0]).toEqual([''])
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([''])
  })

  // Test 8: Emits cancel on Escape keydown
  it('emits cancel on Escape keydown', async () => {
    const wrapper = mount(EditTodoInput)
    const input = wrapper.find('[data-testid="EditTodoInput"]')
    
    await input.setValue('Some text')
    await input.trigger('keydown.esc')
    
    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted().cancel).toHaveLength(1)
    
    // Should not save on cancel
    expect(wrapper.emitted()).not.toHaveProperty('save')
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
  })
  
  // Test 9: Two-way binding simulation
  it('updates modelValue through user input and events', async () => {
    const wrapper = mount(EditTodoInput, {
      props: {
        modelValue: 'start'
      }
    })
    const input = wrapper.find('[data-testid="EditTodoInput"]')

    await input.setValue('end')
    await input.trigger('blur')

    // Check that the correct event was emitted
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['end'])

    // Simulate parent component updating the prop
    await wrapper.setProps({ modelValue: 'end' })
    
    expect(input.element.value).toBe('end')
  })
});