/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import FilterLinkActive from './10_FilterLink_Active.vue';


describe('FilterLink_Active Component', () => {
  describe('Rendering', () => {
    it('should render an anchor element', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.element.tagName).toBe('A');
    });

    it('should have correct data-testid attribute', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_Active');
    });

    it('should have href="#" attribute', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.attributes('href')).toBe('#');
    });

    it('should display "Active" text', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.text().trim()).toBe('Active');
    });

    it('should render without selected class when active prop is false', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should render with selected class when active prop is true', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should render without selected class by default (no props)', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.classes()).not.toContain('selected');
    });
  });

  describe('Props', () => {
    it('should accept active prop as false', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.props('active')).toBe(false);
    });

    it('should accept active prop as true', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      expect(wrapper.props('active')).toBe(true);
    });

    it('should have default value of false for active prop', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.props('active')).toBe(false);
    });

    it('should update class when active prop changes from false to true', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');
      
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should update class when active prop changes from true to false', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      expect(wrapper.classes()).toContain('selected');
      
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('selected');
    });
  });

  describe('User Interactions', () => {
    it('should emit select event when clicked', async () => {
      const wrapper = mount(FilterLinkActive);
      await wrapper.trigger('click');
      
      expect(wrapper.emitted()).toHaveProperty('select');
    });

    it('should emit select event with "active" payload when clicked', async () => {
      const wrapper = mount(FilterLinkActive);
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });

    it('should emit select event multiple times on multiple clicks', async () => {
      const wrapper = mount(FilterLinkActive);
      
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toHaveLength(3);
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
      expect(wrapper.emitted('select')[1]).toEqual(['active']);
      expect(wrapper.emitted('select')[2]).toEqual(['active']);
    });

    it('should prevent default behavior on click', async () => {
      const wrapper = mount(FilterLinkActive);
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      await wrapper.element.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should emit select event when clicked regardless of active state', async () => {
      const wrapperInactive = mount(FilterLinkActive, {
        props: { active: false }
      });
      await wrapperInactive.trigger('click');
      expect(wrapperInactive.emitted('select')[0]).toEqual(['active']);

      const wrapperActive = mount(FilterLinkActive, {
        props: { active: true }
      });
      await wrapperActive.trigger('click');
      expect(wrapperActive.emitted('select')[0]).toEqual(['active']);
    });
  });

  describe('Element Selection by data-testid', () => {
    it('should find element using data-testid', () => {
      const wrapper = mount(FilterLinkActive);
      const link = wrapper.find('[data-testid="FilterLink_Active"]');
      
      expect(link.exists()).toBe(true);
    });

    it('should be able to trigger click on element found by data-testid', async () => {
      const wrapper = mount(FilterLinkActive);
      const link = wrapper.find('[data-testid="FilterLink_Active"]');
      
      await link.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });

    it('should verify text content using data-testid selector', () => {
      const wrapper = mount(FilterLinkActive);
      const link = wrapper.find('[data-testid="FilterLink_Active"]');
      
      expect(link.text().trim()).toBe('Active');
    });
  });

  describe('Accessibility', () => {
    it('should be a clickable anchor element', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBeDefined();
    });

    it('should have accessible text content', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.text()).toContain('Active');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid successive clicks', async () => {
      const wrapper = mount(FilterLinkActive);
      
      const clickPromises = [];
      for (let i = 0; i < 10; i++) {
        clickPromises.push(wrapper.trigger('click'));
      }
      await Promise.all(clickPromises);
      
      expect(wrapper.emitted('select')).toHaveLength(10);
    });

    it('should maintain correct state after multiple prop changes', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
      
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('selected');
      
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should still emit events after prop changes', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      
      await wrapper.trigger('click');
      await wrapper.setProps({ active: true });
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toHaveLength(2);
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
      expect(wrapper.emitted('select')[1]).toEqual(['active']);
    });
  });
});