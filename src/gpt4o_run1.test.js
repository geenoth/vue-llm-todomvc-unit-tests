import { mount } from "@vue/test-utils";
import TodoList from "./05_TodoList.vue";

describe("05_TodoList Component", () => {
  const mockTodos = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: true }
  ];

  it("renders correctly with default props", () => {
    const wrapper = mount(TodoList, { props: { todos: [] } });
    const list = wrapper.find('[data-testid="TodoList"]');
    expect(list.exists()).toBe(true);
    expect(wrapper.findAll("li").length).toBe(0);
  });

  it("renders a list of todo items", () => {
    const wrapper = mount(TodoList, { props: { todos: mockTodos } });
    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(2);

    const todoLabels = wrapper.findAll('[data-testid="TodoLabel"]');
    expect(todoLabels[0].text()).toBe("Todo 1");
    expect(todoLabels[1].text()).toBe("Todo 2");

    const todoCheckboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    expect(todoCheckboxes[0].element.checked).toBe(false);
    expect(todoCheckboxes[1].element.checked).toBe(true);
  });

  it("emits toggle event on checkbox change", async () => {
    const wrapper = mount(TodoList, { props: { todos: mockTodos } });
    const todoCheckboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    await todoCheckboxes[0].trigger("change");
    expect(wrapper.emitted().toggle).toBeTruthy();
    expect(wrapper.emitted().toggle[0]).toEqual([1]);
  });

  it("emits edit event on label double-click", async () => {
    const wrapper = mount(TodoList, { props: { todos: mockTodos } });
    const todoLabels = wrapper.findAll('[data-testid="TodoLabel"]');
    await todoLabels[1].trigger("dblclick");
    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit[0]).toEqual([2]);
  });

  it("emits destroy event on button click", async () => {
    const wrapper = mount(TodoList, { props: { todos: mockTodos } });
    const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]');
    await destroyButtons[0].trigger("click");
    expect(wrapper.emitted().destroy).toBeTruthy();
    expect(wrapper.emitted().destroy[0]).toEqual([1]);
  });

  it("handles multiple events and items correctly", async () => {
    const wrapper = mount(TodoList, { props: { todos: mockTodos } });
    const todoCheckboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
    const todoLabels = wrapper.findAll('[data-testid="TodoLabel"]');
    const destroyButtons = wrapper.findAll('[data-testid="DestroyButton"]');

    await todoCheckboxes[1].trigger("change");
    await todoLabels[0].trigger("dblclick");
    await destroyButtons[1].trigger("click");

    expect(wrapper.emitted().toggle[0]).toEqual([2]);
    expect(wrapper.emitted().edit[0]).toEqual([1]);
    expect(wrapper.emitted().destroy[0]).toEqual([2]);
  });
});