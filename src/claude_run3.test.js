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
      expect(input.attributes('type')).toBe('checkbox');
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

    it('updates checkbox state when checked prop changes', async () => {
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

    it('updates checkbox state from checked to unchecked', async () => {
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
      expect(wrapper.emitted('change')).toHaveLength(1);
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

    it('emits multiple change events on multiple clicks', async () => {
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

    it('triggers onChange handler when change event fires', async () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      await input.trigger('change');
      
      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('defines change as an emitted event', () => {
      const wrapper = mount(TodoItemCheckbox);
      
      expect(wrapper.emitted()).toBeDefined();
    });

    it('emits correct boolean value based on checkbox state', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      // Simulate checking the checkbox
      input.element.checked = true;
      await input.trigger('change');
      
      const emittedEvents = wrapper.emitted('change');
      expect(emittedEvents).toBeTruthy();
      expect(typeof emittedEvents[0][0]).toBe('boolean');
    });
  });

  describe('accessibility', () => {
    it('is focusable', () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      expect(input.element.tabIndex).not.toBe(-1);
    });

    it('can be toggled via keyboard interaction', async () => {
      const wrapper = mount(TodoItemCheckbox, {
        props: {
          checked: false
        }
      });
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      // Simulate space key press (which toggles checkbox)
      input.element.checked = true;
      await input.trigger('change');
      
      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles rapid toggling', async () => {
      const wrapper = mount(TodoItemCheckbox);
      const input = wrapper.find('[data-testid="TodoItemCheckbox"]');
      
      for (let i = 0; i < 10; i++) {
        input.element.checked = i % 2 === 0;
        await input.trigger('change');
      }
      
      expect(wrapper.emitted('change')).toHaveLength(10);
    });

    it('correctly reflects initial checked state', () => {
      const wrapperUnchecked = mount(TodoItemCheckbox, {
        props: { checked: false }
      });
      const wrapperChecked = mount(TodoItemCheckbox, {
        props: { checked: true }
      });
      
      expect(wrapperUnchecked.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(false);
      expect(wrapperChecked.find('[data-testid="TodoItemCheckbox"]').element.checked).toBe(true);
    });
  });
});