import { mount } from '@vue/test-utils'
import TodoLabel from './08_TodoLabel.vue'; // Assuming the component is in './TodoLabel.vue'

describe('TodoLabel', () => {
  // Test 1: Correct rendering with a title prop
  test('renders the title prop correctly', () => {
    const title = 'My Todo Item'
    const wrapper = mount(TodoLabel, {
      props: {
        title: title
      }
    })
    // Check if the component renders the title
    const label = wrapper.find('[data-testid="TodoLabel"]')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe(title)
  })

  // Test 2: Rendering with default (empty) title prop
  test('renders an empty span when title prop is not provided', () => {
    const wrapper = mount(TodoLabel)
    // Check if the component renders an empty span
    const label = wrapper.find('[data-testid="TodoLabel"]')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('')
  })

  // Test 3: User interaction - double click event
  test('emits an "edit" event on double click', async () => {
    const wrapper = mount(TodoLabel, {
      props: {
        title: 'Click me'
      }
    })
    const label = wrapper.find('[data-testid="TodoLabel"]')

    // Simulate a double click event
    await label.trigger('dblclick')

    // Check if the 'edit' event was emitted
    expect(wrapper.emitted()).toHaveProperty('edit')
    // Check if it was emitted exactly once
    expect(wrapper.emitted().edit).toHaveLength(1)
  })

  // Test 4: Props update
  test('updates the displayed title when the prop changes', async () => {
    const wrapper = mount(TodoLabel, {
      props: {
        title: 'Initial Title'
      }
    })

    // Verify initial title
    expect(wrapper.text()).toBe('Initial Title')

    // Update the prop
    const newTitle = 'Updated Title'
    await wrapper.setProps({ title: newTitle })

    // Verify the DOM is updated with the new title
    expect(wrapper.text()).toBe(newTitle)
  })
})