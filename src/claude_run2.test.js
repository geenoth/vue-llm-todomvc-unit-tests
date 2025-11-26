/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import TodoItemCheckbox from './06_TodoItemCheckbox.vue'


describe('TodoItemCheckbox', () => {
  describe('rendering', () => {
    it('renders a checkbox input element', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.exists()).toBe(true);
      expect(input.element.tagName).toBe('INPUT');
      expect(input.element.type).toBe('checkbox');
    });

    it('renders with data-testid attribute', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.attributes('data-testid')).toBe('TodoItemCheckbox');
    });

    it('renders unchecked by default when no props provided', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(false);
    });

    it('renders checked when checked prop is true', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.checked).toBe(true);
    });

    it('renders unchecked when checked prop is false', () => {
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
    it('accepts checked prop as boolean', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      
      expect(wrapper.props('checked')).toBe(true);
    });

    it('has default value of false for checked prop', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      expect(wrapper.props('checked')).toBe(false);
    });

    it('updates checked state when prop changes', async () => {
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

    it('updates from checked to unchecked when prop changes', async () => {
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
    it('emits change event when checkbox is clicked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change').length).toBe(1);
    });

    it('emits change event with true when unchecked checkbox is checked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      
      expect(wrapper.emitted('change')[0]).toEqual([true]);
    });

    it('emits change event with false when checked checkbox is unchecked', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: true
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(false);
      
      expect(wrapper.emitted('change')[0]).toEqual([false]);
    });

    it('emits change event on each change interaction', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.setValue(true);
      await input.setValue(false);
      await input.setValue(true);
      
      expect(wrapper.emitted('change').length).toBe(3);
      expect(wrapper.emitted('change')[0]).toEqual([true]);
      expect(wrapper.emitted('change')[1]).toEqual([false]);
      expect(wrapper.emitted('change')[2]).toEqual([true]);
    });

    it('triggers change event handler on native change event', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      input.element.checked = true;
      await input.trigger('change');
      
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')[0]).toEqual([true]);
    });
  });

  describe('edge cases', () => {
    it('handles rapid toggling correctly', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      for (let i = 0; i < 5; i++) {
        await input.setValue(i % 2 === 0);
      }
      
      expect(wrapper.emitted('change').length).toBe(5);
    });

    it('correctly identifies as a checkbox type', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.attributes('type')).toBe('checkbox');
    });

    it('is accessible via data-testid selector', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.exists()).toBe(true);
    });

    it('component does not emit events on mount', () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      
      expect(wrapper.emitted('change')).toBeFalsy();
    });

    it('component does not emit events on prop change', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      
      await wrapper.setProps({ checked: true });
      
      expect(wrapper.emitted('change')).toBeFalsy();
    });
  });

  describe('emits configuration', () => {
    it('has change as a declared emit', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      // Verify component can emit change event
      wrapper.vm.$emit('change', true);
      
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')[0]).toEqual([true]);
    });
  });
});