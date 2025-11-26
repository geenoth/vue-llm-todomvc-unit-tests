import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import TodoList from './05_TodoList.vue';


describe('TodoList', () => {
  const createWrapper = (props = {}) => {
    return mount(TodoList, {
      props
    });
  };

  describe('rendering', () => {
    it('should render the component with data-testid', () => {
      const wrapper = createWrapper();
      expect(wrapper.find('[data-testid="TodoList"]').exists()).toBe(true);
    });

    it('should render an empty list when no todos provided', () => {
      const wrapper = createWrapper({ todos: [] });
      expect(wrapper.findAll('li')).toHaveLength(0);
    });

    it('should render correct number of todo items', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      expect(wrapper.findAll('li')).toHaveLength(3);
    });

    it('should render todo titles correctly', () => {
      const todos = [
        { id: 1, title: 'First Todo', completed: false },
        { id: 2, title: 'Second Todo', completed: true }
      ];
      const wrapper = createWrapper({ todos });
      const labels = wrapper.findAll('[data-testid="TodoLabel"]');
      expect(labels[0].text()).toBe('First Todo');
      expect(labels[1].text()).toBe('Second Todo');
    });

    it('should render checkboxes with correct checked state', () => {
      const todos = [
        { id: 1, title: 'Incomplete', completed: false },
        { id: 2, title: 'Complete', completed: true }
      ];
      const wrapper = createWrapper({ todos });
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
      expect(checkboxes[0].element.checked).toBe(false);
      expect(checkboxes[1].element.checked).toBe(true);
    });

    it('should render destroy buttons for each todo', () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      const buttons = wrapper.findAll('[data-testid="DestroyButton"]');
      expect(buttons).toHaveLength(2);
      expect(buttons[0].text()).toBe('×');
    });
  });

  describe('props', () => {
    it('should use default empty array when todos prop not provided', () => {
      const wrapper = createWrapper();
      expect(wrapper.findAll('li')).toHaveLength(0);
    });

    it('should update when todos prop changes', async () => {
      const wrapper = createWrapper({ todos: [] });
      expect(wrapper.findAll('li')).toHaveLength(0);

      await wrapper.setProps({
        todos: [{ id: 1, title: 'New Todo', completed: false }]
      });
      expect(wrapper.findAll('li')).toHaveLength(1);
    });

    it('should handle todos with different id types', () => {
      const todos = [
        { id: 'abc', title: 'String ID', completed: false },
        { id: 123, title: 'Number ID', completed: true }
      ];
      const wrapper = createWrapper({ todos });
      expect(wrapper.findAll('li')).toHaveLength(2);
    });
  });

  describe('toggle event', () => {
    it('should emit toggle event when checkbox is changed', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggle')).toBeTruthy();
      expect(wrapper.emitted('toggle')[0]).toEqual([1]);
    });

    it('should emit toggle with correct todo id for multiple todos', async () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false },
        { id: 3, title: 'Todo 3', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
      await checkboxes[1].trigger('change');
      
      expect(wrapper.emitted('toggle')).toBeTruthy();
      expect(wrapper.emitted('toggle')[0]).toEqual([2]);
    });

    it('should emit toggle for completed todo', async () => {
      const todos = [{ id: 5, title: 'Completed Todo', completed: true }];
      const wrapper = createWrapper({ todos });
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggle')[0]).toEqual([5]);
    });
  });

  describe('destroy event', () => {
    it('should emit destroy event when destroy button is clicked', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const button = wrapper.find('[data-testid="DestroyButton"]');
      await button.trigger('click');
      
      expect(wrapper.emitted('destroy')).toBeTruthy();
      expect(wrapper.emitted('destroy')[0]).toEqual([1]);
    });

    it('should emit destroy with correct todo id for multiple todos', async () => {
      const todos = [
        { id: 10, title: 'Todo 1', completed: false },
        { id: 20, title: 'Todo 2', completed: false },
        { id: 30, title: 'Todo 3', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      
      const buttons = wrapper.findAll('[data-testid="DestroyButton"]');
      await buttons[2].trigger('click');
      
      expect(wrapper.emitted('destroy')).toBeTruthy();
      expect(wrapper.emitted('destroy')[0]).toEqual([30]);
    });

    it('should emit multiple destroy events', async () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      
      const buttons = wrapper.findAll('[data-testid="DestroyButton"]');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');
      
      expect(wrapper.emitted('destroy')).toHaveLength(2);
      expect(wrapper.emitted('destroy')[0]).toEqual([1]);
      expect(wrapper.emitted('destroy')[1]).toEqual([2]);
    });
  });

  describe('edit event', () => {
    it('should emit edit event when label is double-clicked', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const label = wrapper.find('[data-testid="TodoLabel"]');
      await label.trigger('dblclick');
      
      expect(wrapper.emitted('edit')).toBeTruthy();
      expect(wrapper.emitted('edit')[0]).toEqual([1]);
    });

    it('should emit edit with correct todo id for multiple todos', async () => {
      const todos = [
        { id: 100, title: 'Todo 1', completed: false },
        { id: 200, title: 'Todo 2', completed: true },
        { id: 300, title: 'Todo 3', completed: false }
      ];
      const wrapper = createWrapper({ todos });
      
      const labels = wrapper.findAll('[data-testid="TodoLabel"]');
      await labels[1].trigger('dblclick');
      
      expect(wrapper.emitted('edit')).toBeTruthy();
      expect(wrapper.emitted('edit')[0]).toEqual([200]);
    });

    it('should not emit edit on single click', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const label = wrapper.find('[data-testid="TodoLabel"]');
      await label.trigger('click');
      
      expect(wrapper.emitted('edit')).toBeFalsy();
    });
  });

  describe('multiple interactions', () => {
    it('should handle multiple different events', async () => {
      const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true }
      ];
      const wrapper = createWrapper({ todos });
      
      const checkboxes = wrapper.findAll('[data-testid="TodoItemCheckbox"]');
      const labels = wrapper.findAll('[data-testid="TodoLabel"]');
      const buttons = wrapper.findAll('[data-testid="DestroyButton"]');
      
      await checkboxes[0].trigger('change');
      await labels[1].trigger('dblclick');
      await buttons[0].trigger('click');
      
      expect(wrapper.emitted('toggle')[0]).toEqual([1]);
      expect(wrapper.emitted('edit')[0]).toEqual([2]);
      expect(wrapper.emitted('destroy')[0]).toEqual([1]);
    });

    it('should handle repeated toggle events on same todo', async () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
      await checkbox.trigger('change');
      await checkbox.trigger('change');
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggle')).toHaveLength(3);
    });
  });

  describe('edge cases', () => {
    it('should handle todo with empty title', () => {
      const todos = [{ id: 1, title: '', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const label = wrapper.find('[data-testid="TodoLabel"]');
      expect(label.text()).toBe('');
    });

    it('should handle todo with special characters in title', () => {
      const todos = [{ id: 1, title: '<script>alert("xss")</script>', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const label = wrapper.find('[data-testid="TodoLabel"]');
      expect(label.text()).toBe('<script>alert("xss")</script>');
    });

    it('should handle large number of todos', () => {
      const todos = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Todo ${i + 1}`,
        completed: i % 2 === 0
      }));
      const wrapper = createWrapper({ todos });
      
      expect(wrapper.findAll('li')).toHaveLength(100);
      expect(wrapper.findAll('[data-testid="TodoItemCheckbox"]')).toHaveLength(100);
    });

    it('should handle todo with numeric id as 0', async () => {
      const todos = [{ id: 0, title: 'Zero ID Todo', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const checkbox = wrapper.find('[data-testid="TodoItemCheckbox"]');
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggle')[0]).toEqual([0]);
    });

    it('should handle unicode characters in title', () => {
      const todos = [{ id: 1, title: '日本語テスト 🎉 émojis', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const label = wrapper.find('[data-testid="TodoLabel"]');
      expect(label.text()).toBe('日本語テスト 🎉 émojis');
    });
  });

  describe('component structure', () => {
    it('should have ul element inside the root div', () => {
      const todos = [{ id: 1, title: 'Test', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const rootDiv = wrapper.find('[data-testid="TodoList"]');
      expect(rootDiv.find('ul').exists()).toBe(true);
    });

    it('should have checkbox before label in each li', () => {
      const todos = [{ id: 1, title: 'Test', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const li = wrapper.find('li');
      const children = li.element.children;
      expect(children[0].tagName).toBe('INPUT');
      expect(children[1].tagName).toBe('LABEL');
    });

    it('should have destroy button after label in each li', () => {
      const todos = [{ id: 1, title: 'Test', completed: false }];
      const wrapper = createWrapper({ todos });
      
      const li = wrapper.find('li');
      const children = li.element.children;
      expect(children[2].tagName).toBe('BUTTON');
    });
  });
});