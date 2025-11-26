/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import ToggleAllCheckbox from './07_ToggleAllCheckbox.vue'


describe('ToggleAllCheckbox', () => {
  describe('rendering', () => {
    it('should render a checkbox input element', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.tagName).toBe('INPUT');
      expect(checkbox.attributes('type')).toBe('checkbox');
    });

    it('should render unchecked by default when allChecked prop is not provided', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
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

    it('should render checked when allChecked prop is true', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(true);
    });

    it('should have the correct data-testid attribute', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('input');
      
      expect(checkbox.attributes('data-testid')).toBe('ToggleAllCheckbox');
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

  describe('props reactivity', () => {
    it('should update checked state when allChecked prop changes from false to true', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(false);
      
      await wrapper.setProps({ allChecked: true });
      
      expect(checkbox.element.checked).toBe(true);
    });

    it('should update checked state when allChecked prop changes from true to false', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.checked).toBe(true);
      
      await wrapper.setProps({ allChecked: false });
      
      expect(checkbox.element.checked).toBe(false);
    });

    it('should handle multiple prop updates correctly', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      await wrapper.setProps({ allChecked: true });
      expect(checkbox.element.checked).toBe(true);
      
      await wrapper.setProps({ allChecked: false });
      expect(checkbox.element.checked).toBe(false);
      
      await wrapper.setProps({ allChecked: true });
      expect(checkbox.element.checked).toBe(true);
    });
  });

  describe('props validation', () => {
    it('should accept boolean true for allChecked prop', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      
      expect(wrapper.props('allChecked')).toBe(true);
    });

    it('should accept boolean false for allChecked prop', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      
      expect(wrapper.props('allChecked')).toBe(false);
    });

    it('should have default value of false for allChecked prop', () => {
      const wrapper = mount(ToggleAllCheckbox);
      
      expect(wrapper.props('allChecked')).toBe(false);
    });
  });

  describe('emits definition', () => {
    it('should only emit toggleAll event', async () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      await checkbox.setValue(true);
      
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents).toContain('toggleAll');
      expect(emittedEvents).toHaveLength(1);
    });
  });

  describe('edge cases', () => {
    it('should not emit any event on mount', () => {
      const wrapper = mount(ToggleAllCheckbox);
      
      expect(wrapper.emitted('toggleAll')).toBeFalsy();
    });

    it('should not emit any event when props change', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      
      await wrapper.setProps({ allChecked: true });
      
      expect(wrapper.emitted('toggleAll')).toBeFalsy();
    });

    it('should handle rapid consecutive changes', async () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(checkbox.setValue(i % 2 === 0));
      }
      await Promise.all(promises);
      
      expect(wrapper.emitted('toggleAll')).toBeTruthy();
      expect(wrapper.emitted('toggleAll').length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should be focusable', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should be a native checkbox for accessibility', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element instanceof HTMLInputElement).toBe(true);
      expect(checkbox.element.type).toBe('checkbox');
    });
  });
});