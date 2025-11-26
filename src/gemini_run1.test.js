import { mount } from '@vue/test-utils';
import TodoLabel from './08_TodoLabel.vue'; // Adjust the import path if necessary

describe('08_TodoLabel', () => {
  // 1. Test correct rendering based on props
  test('renders the title from props', () => {
    const title = 'My Todo Item';
    const wrapper = mount(TodoLabel, {
      props: {
        title: title,
      },
    });

    // Use data-testid to find the element
    const label = wrapper.find('[data-testid="TodoLabel"]');

    // Assert that the element exists
    expect(label.exists()).toBe(true);

    // Assert that the text content matches the prop
    expect(label.text()).toBe(title);
  });

  // 2. Test rendering with default (empty) prop
  test('renders an empty span when title prop is not provided', () => {
    const wrapper = mount(TodoLabel);

    const label = wrapper.find('[data-testid="TodoLabel"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('');
  });

  // 3. Test user interaction (double-click)
  test('emits an "edit" event on double-click', async () => {
    const wrapper = mount(TodoLabel, {
      props: { title: 'Double Click Me' },
    });

    const label = wrapper.find('[data-testid="TodoLabel"]');

    // Trigger the double-click event
    await label.trigger('dblclick');

    // Assert that the 'edit' event was emitted
    expect(wrapper.emitted()).toHaveProperty('edit');

    // Assert that the 'edit' event was emitted exactly once
    expect(wrapper.emitted().edit).toHaveLength(1);
  });

  // 4. Test state changes (props update)
  test('updates the displayed title when the prop changes', async () => {
    const initialTitle = 'Initial Title';
    const updatedTitle = 'Updated Title';

    const wrapper = mount(TodoLabel, {
      props: {
        title: initialTitle,
      },
    });

    // Check initial state
    const label = wrapper.find('[data-testid="TodoLabel"]');
    expect(label.text()).toBe(initialTitle);

    // Update the props
    await wrapper.setProps({ title: updatedTitle });

    // Assert that the component re-rendered with the new title
    expect(label.text()).toBe(updatedTitle);
  });
});