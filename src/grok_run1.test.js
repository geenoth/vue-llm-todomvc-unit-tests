import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import EditTodoInput from './02_EditTodoInput.vue';

describe('EditTodoInput', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return mount(EditTodoInput, {
      props: {
        modelValue: '',
        placeholder: 'Edit todo',
        ...props
      }
    })
  }

  beforeEach(() => {
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('renders input element with correct data-testid', () => {
    expect(wrapper.find('[data-testid="EditTodoInput"]').exists()).toBe(true)
  })

  test('displays correct placeholder text', () => {
    expect(wrapper.find('input').attributes('placeholder')).toBe('Edit todo')
  })

  test('updates input value when modelValue prop changes', async () => {
    await wrapper.setProps({ modelValue: 'Test Todo' })
    expect(wrapper.find('input').element.value).toBe('Test Todo')
  })

  test('emits update:modelValue when input value changes', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Todo')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Todo'])
  })

  test('emits save event with trimmed value on Enter key press', async () => {
    const input = wrapper.find('input')
    await input.setValue('  Save Todo  ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0]).toEqual(['Save Todo'])
    expect(wrapper.emitted('update:modelValue')[1]).toEqual(['Save Todo'])
  })

  test('emits save event with trimmed value on blur', async () => {
    const input = wrapper.find('input')
    await input.setValue('  Blur Todo  ')
    await input.trigger('blur')
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0]).toEqual(['Blur Todo'])
    expect(wrapper.emitted('update:modelValue')[1]).toEqual(['Blur Todo'])
  })

  test('emits cancel event on Esc key press', async () => {
    const input = wrapper.find('input')
    await input.trigger('keydown.esc')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('handles empty input on save by emitting empty string', async () => {
    const input = wrapper.find('input')
    await input.setValue('   ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('save')[0]).toEqual([''])
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([''])
  })
})