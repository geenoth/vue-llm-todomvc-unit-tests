/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'


describe('ToggleAllCheckbox', () => {
  describe('rendering', () => {
    it('should render a checkbox input', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.type).toBe('checkbox');
    });

    it('should render with data-testid attribute', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.attributes('data-testid')).toBe('ToggleAllCheckbox');
    });

    it('should render unchecked by default when no props provided', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
    });
  });

  describe('props', () => {
    it('should render checked when allChecked prop is true', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(true);
    });

    it('should render unchecked when allChecked prop is false', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
    });

    it('should update checked state when allChecked prop changes', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
      
      await wrapper.setProps({ allChecked: true });
      expect(checkbox.element.checked).toBe(true);
      
      await wrapper.setProps({ allChecked: false });
      expect(checkbox.element.checked).toBe(false);
    });

    it('should use default value of false for allChecked prop', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should emit toggleAll event with true when unchecked checkbox is clicked', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      await checkbox.setValue(true);
      
      expect(wrapper.emitted('toggleAll')).toBeTruthy();
      expect(wrapper.emitted('toggleAll')).toHaveLength(1);
      expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
    });

    it('should emit toggleAll event with false when checked checkbox is clicked', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      await checkbox.setValue(false);
      
      expect(wrapper.emitted('toggleAll')).toBeTruthy();
      expect(wrapper.emitted('toggleAll')).toHaveLength(1);
      expect(wrapper.emitted('toggleAll')[0]).toEqual([false]);
    });

    it('should emit toggleAll event on change event', async () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      checkbox.element.checked = true;
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggleAll')).toBeTruthy();
      expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
    });

    it('should emit multiple toggleAll events on multiple interactions', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      await checkbox.setValue(true);
      await checkbox.setValue(false);
      await checkbox.setValue(true);
      
      expect(wrapper.emitted('toggleAll')).toHaveLength(3);
      expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
      expect(wrapper.emitted('toggleAll')[1]).toEqual([false]);
      expect(wrapper.emitted('toggleAll')[2]).toEqual([true]);
    });
  });

  describe('event emission', () => {
    it('should not emit any events on initial render', () => {
      const wrapper = mount(ToggleAllCheckbox);
      
      expect(wrapper.emitted('toggleAll')).toBeFalsy();
    });

    it('should emit toggleAll with correct boolean value based on checkbox state', async () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      // Simulate checking the checkbox
      checkbox.element.checked = true;
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggleAll')[0][0]).toBe(true);
      expect(typeof wrapper.emitted('toggleAll')[0][0]).toBe('boolean');
      
      // Simulate unchecking the checkbox
      checkbox.element.checked = false;
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggleAll')[1][0]).toBe(false);
      expect(typeof wrapper.emitted('toggleAll')[1][0]).toBe('boolean');
    });
  });

  describe('accessibility', () => {
    it('should be an input element of type checkbox', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.tagName.toLowerCase()).toBe('input');
      expect(checkbox.attributes('type')).toBe('checkbox');
    });

    it('should be focusable', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.tabIndex).not.toBe(-1);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid toggling', async () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      for (let i = 0; i < 10; i++) {
        checkbox.element.checked = i % 2 === 0;
        await checkbox.trigger('change');
      }
      
      expect(wrapper.emitted('toggleAll')).toHaveLength(10);
    });

    it('should work correctly when starting with allChecked true', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(true);
      
      await checkbox.setValue(false);
      
      expect(wrapper.emitted('toggleAll')[0]).toEqual([false]);
    });
  });
});