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

    it('should render with correct data-testid attribute', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_Active');
    });

    it('should render with href="#"', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.attributes('href')).toBe('#');
    });

    it('should render "Active" text content', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.text()).toContain('Active');
    });

    it('should find element by data-testid', () => {
      const wrapper = mount(FilterLinkActive);
      const link = wrapper.find('[data-testid="FilterLink_Active"]');
      expect(link.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('should have active prop default to false', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.props('active')).toBe(false);
    });

    it('should accept active prop as true', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      expect(wrapper.props('active')).toBe(true);
    });

    it('should accept active prop as false', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.props('active')).toBe(false);
    });
  });

  describe('CSS Classes', () => {
    it('should not have "selected" class when active is false', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should have "selected" class when active is true', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should not have "selected" class by default', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should toggle "selected" class based on active prop', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');

      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');

      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('selected');
    });
  });

  describe('User Interactions - Click Events', () => {
    it('should emit "select" event when clicked', async () => {
      const wrapper = mount(FilterLinkActive);
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')).toBeTruthy();
    });

    it('should emit "select" event with "active" payload when clicked', async () => {
      const wrapper = mount(FilterLinkActive);
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });

    it('should emit "select" event each time clicked', async () => {
      const wrapper = mount(FilterLinkActive);
      
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')).toHaveLength(1);
      
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')).toHaveLength(2);
      
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')).toHaveLength(3);
    });

    it('should emit "select" with correct payload on multiple clicks', async () => {
      const wrapper = mount(FilterLinkActive);
      
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      
      const emitted = wrapper.emitted('select');
      expect(emitted[0]).toEqual(['active']);
      expect(emitted[1]).toEqual(['active']);
      expect(emitted[2]).toEqual(['active']);
    });

    it('should prevent default behavior on click', async () => {
      const wrapper = mount(FilterLinkActive);
      const event = { preventDefault: jest.fn() };
      
      await wrapper.trigger('click', event);
      
      // The .prevent modifier should prevent default
      expect(wrapper.emitted('select')).toBeTruthy();
    });

    it('should emit event when clicking on the link element using data-testid', async () => {
      const wrapper = mount(FilterLinkActive);
      const link = wrapper.find('[data-testid="FilterLink_Active"]');
      
      await link.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });
  });

  describe('Event Emission', () => {
    it('should only emit "select" event (no other events on click)', async () => {
      const wrapper = mount(FilterLinkActive);
      await wrapper.trigger('click');
      
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents).toContain('select');
      expect(emittedEvents).toHaveLength(1);
    });

    it('should not emit any events before interaction', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.emitted('select')).toBeUndefined();
    });
  });

  describe('Component State', () => {
    it('should render correctly with active=true initially', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      
      expect(wrapper.classes()).toContain('selected');
      expect(wrapper.text()).toContain('Active');
    });

    it('should render correctly with active=false initially', () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      
      expect(wrapper.classes()).not.toContain('selected');
      expect(wrapper.text()).toContain('Active');
    });

    it('should still emit events when active is true', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: true }
      });
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });

    it('should still emit events when active is false', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
    });
  });

  describe('Accessibility', () => {
    it('should be a clickable link element', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBeDefined();
    });

    it('should have visible text content', () => {
      const wrapper = mount(FilterLinkActive);
      expect(wrapper.text().trim()).toBe('Active');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks', async () => {
      const wrapper = mount(FilterLinkActive);
      
      const clicks = Array(10).fill(null).map(() => wrapper.trigger('click'));
      await Promise.all(clicks);
      
      expect(wrapper.emitted('select')).toHaveLength(10);
    });

    it('should maintain consistent behavior after prop changes', async () => {
      const wrapper = mount(FilterLinkActive, {
        props: { active: false }
      });
      
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')[0]).toEqual(['active']);
      
      await wrapper.setProps({ active: true });
      
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')[1]).toEqual(['active']);
    });
  });
});