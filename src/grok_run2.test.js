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

  test('renders input element with correct placeholder', () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('What needs to be done?')
  })

  test('renders input with custom placeholder prop', () => {
    wrapper = mount(AddTodoInput, {
      props: {
        placeholder: 'Enter a task'
      }
    })
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    expect(input.attributes('placeholder')).toBe('Enter a task')
  })

  test('updates input value when typing', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New Todo')
    expect(input.element.value).toBe('New Todo')
  })

  test('emits add event with trimmed value on Enter key press', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('  New Todo  ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual(['New Todo'])
  })

  test('clears input after emitting add event on Enter', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('New Todo')
    await input.trigger('keydown.enter')
    expect(input.element.value).toBe('')
  })

  test('does not emit add event on Enter if input is empty', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeFalsy()
  })

  test('does not emit add event on Enter if input is only whitespace', async () => {
    const input = wrapper.find('[data-testid="AddTodoInput"]')
    await input.setValue('   ')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('add')).toBeFalsy()
  })
})