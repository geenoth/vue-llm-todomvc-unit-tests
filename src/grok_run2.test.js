import { mount } from '@vue/test-utils';
import TodoList from './05_TodoList.vue';

describe('TodoList Component', () => {
  const todos = [
    { id: 1, title: 'First Todo', completed: false },
    { id: 2, title: 'Second Todo', completed: true },
  ];

  let wrapper;

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
    expect(todoItems.length).toBe(todos.length);
  });

  test('renders todo item content correctly', () => {
    const labels = wrapper.findAll('[data-testid="TodoLabel"]');
    expect(labels[0].text()).toBe('First Todo');
    expect(labels[1].text()).toBe('Second Todo');
  });

  test('renders checkbox state based on todo completed prop', () => {
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    expect(checkboxes[0].element.checked).toBe(false);
    expect(checkboxes[1].element.checked).toBe(true);
  });

  test('emits toggle event when checkbox is changed', async () => {
    const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    await checkboxes[0].trigger('change');
    expect(wrapper.emitted('toggle')).toHaveLength(1);
    expect(wrapper.emitted('toggle')[0]).toEqual([1]);
  });

  test('emits destroy event when destroy button is clicked', async () => {
    const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]');
    await destroyButtons[0].trigger('click');
    expect(wrapper.emitted('destroy')).toHaveLength(1);
    expect(wrapper.emitted('destroy')[0]).toEqual([1]);
  });

  test('emits edit event when label is double-clicked', async () => {
    const labels = wrapper.findAll('[data-testid="TodoLabel"]');
    await labels[0].trigger('dblclick');
    expect(wrapper.emitted('edit')).toHaveLength(1);
    expect(wrapper.emitted('edit')[0]).toEqual([1]);
  });

  test('renders correctly with empty todos array', () => {
    const emptyWrapper = mount(TodoList, {
      props: { todos: [] },
    });
    const todoItems = emptyWrapper.findAll('li');
    expect(todoItems.length).toBe(0);
    emptyWrapper.unmount();
  });
});