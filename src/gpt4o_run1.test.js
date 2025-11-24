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

  test('renders with custom placeholder', () => {
    const placeholder = 'Add your custom task here'
    const { getByTestId } = render(AddTodoInput, {
      props: { placeholder },
    })

    const input = getByTestId('AddTodoInput')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  test('does not emit "add" if input is empty or only whitespace', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, ' ')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeUndefined()
  })

  test('emits "add" event with trimmed value on Enter key press', async () => {
    const { getByTestId, emitted } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    const newValue = '  New Task  '
    await fireEvent.update(input, newValue)
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().add).toBeDefined()
    expect(emitted().add.length).toBe(1)
    expect(emitted().add[0]).toEqual(['New Task'])
  })

  test('clears the input after emitting event', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    await fireEvent.update(input, 'Some Task')
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })

  test('updates input value through v-model', async () => {
    const { getByTestId } = render(AddTodoInput)

    const input = getByTestId('AddTodoInput')
    const updatedValue = 'Updated task'
    await fireEvent.update(input, updatedValue)

    expect(input.value).toBe(updatedValue)
  })
})