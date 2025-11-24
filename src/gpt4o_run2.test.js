import { render, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom'
import AddTodoInput from './01_AddTodoInput.vue'

describe('AddTodoInput Component', () => {
  test('renders correctly with default placeholder', () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'What needs to be done?')
    expect(input).toHaveClass('add-todo-input')
  })

  test('renders correctly with a custom placeholder', () => {
    const customPlaceholder = 'Custom Placeholder'
    const { getByTestId } = render(AddTodoInput, {
      props: { placeholder: customPlaceholder }
    })

    const input = getByTestId('AddTodoInput')
    expect(input).toHaveAttribute('placeholder', customPlaceholder)
  })

  test('does not emit "add" event for empty input on Enter key', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, '')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeFalsy()
  })

  test('emits "add" event with trimmed value on Enter key press', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, '   New Todo   ')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeTruthy()
    expect(emitted().add[0]).toEqual(['New Todo'])
    expect(input.value).toBe('')
  })

  test('clears input value after emitting "add" event', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, 'Some Task')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })

  test('updates input value with v-model', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, 'Updated Value')

    expect(input.value).toBe('Updated Value')
  })
})