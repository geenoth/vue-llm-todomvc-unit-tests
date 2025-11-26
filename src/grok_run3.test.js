import { mount } from '@vue/test-utils';
import TodoList from './05_TodoList.vue';

describe('TodoList Component', () => {
  let wrapper;
  const todos = [
    { id: 1, title: 'First Todo', completed: false },
    { id: 2, title: 'Second Todo', completed: true },
  ];

  beforeEach(() => {
    wrapper = mount(TodoList, {
      props: { todos },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders the TodoList container', () => {
    expect(wrapper.get('[data-testid="TodoList"]').exists()).toBe(true);
  });

  test('renders the correct number of todo items', () => {
    const todoItems = wrapper.findAll('li');
    expect(todoItems).toHaveLength(todos.length);
  });

  test('renders todo item content correctly', () => {
    const firstTodoLabel = wrapper.findAll('[data-testid="TodoLabel"]')[0];
    expect(firstTodoLabel.text()).toBe(todos[0].title);
  });

  test('checkbox reflects todo completed status', () => {
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    expect(checkboxes[0].element.checked).toBe(todos[0].completed);
    expect(checkboxes[1].element.checked).toBe(todos[1].completed);
  });

  test('emits toggle event when checkbox is changed', async () => {
    const checkbox = wrapper.findAll('[data-testid="TodoItemCheckbox"]')[0];
    await checkbox.trigger('change');
    expect(wrapper.emitted('toggle')).toHaveLength(1);
    expect(wrapper.emitted('toggle')[0]).toEqual([todos[0].id]);
  });

  test('emits edit event on double-clicking todo label', async () => {
    const label = wrapper.findAll('[data-testid="TodoLabel"]')[0];
    await label.trigger('dblclick');
    expect(wrapper.emitted('edit')).toHaveLength(1);
    expect(wrapper.emitted('edit')[0]).toEqual([todos[0].id]);
  });

  test('emits destroy event when destroy button is clicked', async () => {
    const destroyButton = wrapper.findAll('[data-testid="DestroyButton"]')[0];
    await destroyButton.trigger('click');
    expect(wrapper.emitted('destroy')).toHaveLength(1);
    expect(wrapper.emitted('destroy')[0]).toEqual([todos[0].id]);
  });

  test('renders correctly with empty todos array', () => {
    const emptyWrapper = mount(TodoList, {
      props: { todos: [] },
    });
    expect(emptyWrapper.findAll('li')).toHaveLength(0);
    emptyWrapper.unmount();
  });
});