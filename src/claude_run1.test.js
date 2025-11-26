import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'



describe('TodoItemCheckbox', () => {
  describe('rendering', () => {
    it('should render a checkbox input', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.exists()).toBe(true);
      expect(input.element.type).toBe('checkbox');
    });

    it('should have data-testid attribute', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('input');
      
      expect(input.attributes('data-testid')).toBe('TodoItemCheckbox');
    });

    it('should render unchecked by default', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(false);
    });

    it('should render checked when checked prop is true', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(true);
    });

    it('should render unchecked when checked prop is false', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(false);
    });
  });

  describe('props', () => {
    it('should accept checked prop as boolean', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      
      expect(wrapper.props('checked')).toBe(true);
    });

    it('should default checked prop to false', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      expect(wrapper.props('checked')).toBe(false);
    });

    it('should update checkbox state when checked prop changes', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(false);
      
      await wrapper.setProps({ checked: true });
      
      expect(input.element.checked).toBe(true);
    });

    it('should update checkbox state from true to false', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(true);
      
      await wrapper.setProps({ checked: false });
      
      expect(input.element.checked).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should emit change event when checkbox is clicked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')).toHaveLength(1);
    });

    it('should emit true when unchecked checkbox is checked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      
      expect(wrapper.emitted('change')[0]).toEqual([true]);
    });

    it('should emit false when checked checkbox is unchecked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(false);
      
      expect(wrapper.emitted('change')[0]).toEqual([false]);
    });

    it('should emit change event on each click', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      await input.setValue(false);
      await input.setValue(true);
      
      expect(wrapper.emitted('change')).toHaveLength(3);
      expect(wrapper.emitted('change')[0]).toEqual([true]);
      expect(wrapper.emitted('change')[1]).toEqual([false]);
      expect(wrapper.emitted('change')[2]).toEqual([true]);
    });

    it('should trigger change event handler', async () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.trigger('change');
      
      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('emits', () => {
    it('should define change event in emits', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      expect(wrapper.emitted()).toBeDefined();
    });

    it('should emit correct boolean value type', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      
      const emittedValue = wrapper.emitted('change')[0][0];
      expect(typeof emittedValue).toBe('boolean');
    });
  });

  describe('accessibility', () => {
    it('should be focusable', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.tabIndex).not.toBe(-1);
    });

    it('should respond to keyboard interaction', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.trigger('keydown', { key: ' ' });
      await input.setValue(true);
      
      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid toggling', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      for (let i = 0; i < 10; i++) {
        await input.setValue(i % 2 === 0);
      }
      
      expect(wrapper.emitted('change')).toHaveLength(10);
    });

    it('should not emit when no interaction occurs', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      expect(wrapper.emitted('change')).toBeFalsy();
    });

    it('should maintain correct state after multiple prop updates', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await wrapper.setProps({ checked: true });
      expect(input.element.checked).toBe(true);
      
      await wrapper.setProps({ checked: false });
      expect(input.element.checked).toBe(false);
      
      await wrapper.setProps({ checked: true });
      expect(input.element.checked).toBe(true);
    });
  });
});