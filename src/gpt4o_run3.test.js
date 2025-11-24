import { render, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom'
import AddTodoInput from './01_AddTodoInput.vue'

describe('01_AddTodoInput Component', () => {
  test('renders correctly with default placeholder', () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('add-todo-input')
    expect(input).toHaveAttribute('placeholder', 'What needs to be done?')
  })

  test('renders with a custom placeholder', () => {
    const customPlaceholder = 'Add your task here'
    const { getByTestId } = render(AddTodoInput, {
      props: { placeholder: customPlaceholder },
    })

    const input = getByTestId('AddTodoInput')
    expect(input).toHaveAttribute('placeholder', customPlaceholder)
  })

  test('does not emit "add" event when input is empty on Enter key press', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, '')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeUndefined()
  })

  test('emits "add" event with trimmed value on Enter key press', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, '   New Task   ')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeTruthy()
    expect(emitted().add.length).toBe(1)
    expect(emitted().add[0]).toEqual(['New Task'])
  })

  test('clears input after adding a new task', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, 'Another Task')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })

  test('updates input value through v-model binding', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, 'Updated Task')

    expect(input.value).toBe('Updated Task')
  })
})