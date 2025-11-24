import { mount } from '@vue/test-utils'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddTodoInput)
  })

  it('renders the input element correctly', () => {
    expect(wrapper.find('[data-testid="AddTodoInput"]').exists()).toBe(true)
  })

  it('displays the default placeholder text', () => {
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe(
      'What needs to be done?',
    )
  })

  it('displays a custom placeholder when provided', async () => {
    wrapper = mount(AddTodoInput, {
      props: {
        placeholder: 'Enter a task',
      },
    })
    expect(wrapper.find('[data-testid="AddTodoInput"]').attributes('placeholder')).toBe(
      'Enter a task',
    )
  })

  it('updates input value when typing', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New Todo')
    expect(input.element.value).toBe('New Todo')
  })

  it('emits add event with trimmed value on Enter key press', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('  New Todo  ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual(['New Todo'])
  })

  it('clears input after emitting add event on Enter key press', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New Todo')
    await input.trigger('keydown.enter')
    expect(input.element.value).toBe('')
  })

  it('does not emit add event on Enter key press if input is empty', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeFalsy()
  })

  it('does not emit add event on Enter key press if input is only whitespace', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('   ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeFalsy()
  })
})
