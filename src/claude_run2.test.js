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
  });

  describe('props', () => {
    it('should have correct default value for allChecked prop', () => {
      const wrapper = mount(ToggleAllCheckbox);
      
      expect(wrapper.props('allChecked')).toBe(false);
    });

    it('should accept allChecked prop as true', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: true
        }
      });
      
      expect(wrapper.props('allChecked')).toBe(true);
    });

    it('should accept allChecked prop as false', () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      
      expect(wrapper.props('allChecked')).toBe(false);
    });

    it('should update checkbox state when allChecked prop changes', async () => {
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

    it('should update checkbox state when allChecked prop changes from true to false', async () => {
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
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
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
      
      // First toggle - check
      checkbox.element.checked = true;
      await checkbox.trigger('change');
      
      // Second toggle - uncheck
      checkbox.element.checked = false;
      await checkbox.trigger('change');
      
      // Third toggle - check again
      checkbox.element.checked = true;
      await checkbox.trigger('change');
      
      expect(wrapper.emitted('toggleAll')).toHaveLength(3);
      expect(wrapper.emitted('toggleAll')[0]).toEqual([true]);
      expect(wrapper.emitted('toggleAll')[1]).toEqual([false]);
      expect(wrapper.emitted('toggleAll')[2]).toEqual([true]);
    });
  });

  describe('emits', () => {
    it('should define toggleAll as an emitted event', () => {
      const wrapper = mount(ToggleAllCheckbox);
      
      expect(wrapper.vm.$options.emits).toContain('toggleAll');
    });
  });

  describe('accessibility', () => {
    it('should have data-testid attribute for testing', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.attributes('data-testid')).toBe('ToggleAllCheckbox');
    });

    it('should be focusable', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.element.tabIndex).toBeGreaterThanOrEqual(0);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid toggling', async () => {
      const wrapper = mount(ToggleAllCheckbox, {
        props: {
          allChecked: false
        }
      });
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      // Rapid toggling
      for (let i = 0; i < 5; i++) {
        checkbox.element.checked = i % 2 === 0;
        await checkbox.trigger('change');
      }
      
      expect(wrapper.emitted('toggleAll')).toHaveLength(5);
    });

    it('should work correctly when mounted without any props', () => {
      const wrapper = mount(ToggleAllCheckbox);
      const checkbox = wrapper.find('[data-testid="ToggleAllCheckbox"]');
      
      expect(checkbox.exists()).toBe(true);
      expect(checkbox.element.checked).toBe(false);
    });
  });
});