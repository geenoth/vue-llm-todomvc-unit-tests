/**
 * @jest-environment jsdom
 */
import { mount } from '@vue/test-utils';
import TodoList from './05_TodoList.vue';

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, title: 'Learn Vue.js', completed: false },
    { id: 2, title: 'Write tests with Jest', completed: true },
    { id: 3, title: 'Deploy the app', completed: false },
  ];

  // Test case for initial rendering
  it('should render an empty list when no todos are provided', () => {
    const wrapper = mount(TodoList);
    expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(0);
  });

  // Test case for rendering with props
  it('should render the correct number of todo items', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
      },
    });
    expect(wrapper.findAll('li').length).toBe(mockTodos.length);
  });

  // Test case for rendering todo content correctly
  it('should render the correct title and completion state for each todo', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
      },
    });

    const todoItems = wrapper.findAll('li');
    todoItems.forEach((item, index) => {
      const todo = mockTodos[index];
      const label = item.find('[data-testid="TodoLabel"]');
      const checkbox = item.find('[data-testid="TodoItemCheckbox"]');

      expect(label.text()).toBe(todo.title);
      expect(checkbox.element.checked).toBe(todo.completed);
    });
  });

  // Test case for 'toggle' event
  it('should emit a "toggle" event with the correct todo id when a checkbox is changed', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
      },
    });

    const firstCheckbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
    await firstCheckbox.trigger('change');

    expect(wrapper.emitted()).toHaveProperty('toggle');
    expect(wrapper.emitted().toggle[0]).toEqual([mockTodos[0].id]);
  });

  // Test case for 'destroy' event
  it('should emit a "destroy" event with the correct todo id when the destroy button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
      },
    });

    const firstDestroyButton = wrapper.find('[data-testid="DestroyButton"]');
    await firstDestroyButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('destroy');
    expect(wrapper.emitted().destroy[0]).toEqual([mockTodos[0].id]);
  });

  // Test case for 'edit' event
  it('should emit an "edit" event with the correct todo id when a label is double-clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
      },
    });

    const secondLabel = wrapper.findAll('[data-testid="TodoLabel"]')[1];
    await secondLabel.trigger('dblclick');

    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit[0]).toEqual([mockTodos[1].id]);
  });

  // Test case for props updates
  it('should re-render the list when the todos prop changes', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [mockTodos[0]],
      },
    });

    expect(wrapper.findAll('li').length).toBe(1);

    await wrapper.setProps({ todos: mockTodos });

    expect(wrapper.findAll('li').length).toBe(mockTodos.length);
    const labels = wrapper.findAll('[data-testid="TodoLabel"]');
    expect(labels[2].text()).toBe(mockTodos[2].title);
  });
});