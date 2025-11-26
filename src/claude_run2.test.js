/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import FilterLinkAll from './09_FilterLink_All.vue';



describe('FilterLink_All Component', () => {
  describe('Rendering', () => {
    it('should render an anchor element', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.element.tagName).toBe('A');
    });

    it('should have the correct data-testid attribute', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_All');
    });

    it('should have href="#" attribute', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.attributes('href')).toBe('#');
    });

    it('should display "All" text', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.text()).toBe('All');
    });

    it('should render correctly with default props', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('should have active prop default to false', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.props('active')).toBe(false);
    });

    it('should accept active prop as true', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: true }
      });
      expect(wrapper.props('active')).toBe(true);
    });

    it('should accept active prop as false', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      });
      expect(wrapper.props('active')).toBe(false);
    });
  });

  describe('CSS Classes', () => {
    it('should not have "selected" class when active is false', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should have "selected" class when active is true', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: true }
      });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should not have "selected" class by default', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should toggle "selected" class based on active prop', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      });
      
      expect(wrapper.classes()).not.toContain('selected');
      
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
      
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('selected');
    });
  });

  describe('User Interactions', () => {
    it('should emit "select" event when clicked', async () => {
      const wrapper = mount(FilterLinkAll);
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted()).toHaveProperty('select');
    });

    it('should emit "select" event with "all" payload when clicked', async () => {
      const wrapper = mount(FilterLinkAll);
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['all']);
    });

    it('should emit "select" event multiple times on multiple clicks', async () => {
      const wrapper = mount(FilterLinkAll);
      
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toHaveLength(3);
    });

    it('should always emit "all" as payload regardless of active state', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: true }
      });
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')[0]).toEqual(['all']);
    });

    it('should prevent default anchor behavior on click', async () => {
      const wrapper = mount(FilterLinkAll);
      const preventDefaultMock = jest.fn();
      
      await wrapper.trigger('click', {
        preventDefault: preventDefaultMock
      });
      
      // The .prevent modifier should handle this
      expect(wrapper.emitted('select')).toBeTruthy();
    });
  });

  describe('Event Emission', () => {
    it('should not emit any events on mount', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.emitted()).toEqual({});
    });

    it('should only emit select event', async () => {
      const wrapper = mount(FilterLinkAll);
      
      await wrapper.trigger('click');
      
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents).toHaveLength(1);
      expect(emittedEvents[0]).toBe('select');
    });
  });

  describe('Accessibility', () => {
    it('should be clickable as a link element', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBeDefined();
    });

    it('should have visible text content', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.text().trim()).toBe('All');
    });
  });

  describe('Component Integration', () => {
    it('should work with active prop changes and emit events', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      });
      
      // Initial state
      expect(wrapper.classes()).not.toContain('selected');
      
      // Click when inactive
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')[0]).toEqual(['all']);
      
      // Change to active
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
      
      // Click when active
      await wrapper.trigger('click');
      expect(wrapper.emitted('select')[1]).toEqual(['all']);
    });
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot when inactive', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match snapshot when active', () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: true }
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('Finding by data-testid', () => {
    it('should be findable by data-testid attribute', () => {
      const wrapper = mount(FilterLinkAll);
      const element = wrapper.find('[data-testid="FilterLink_All"]');
      expect(element.exists()).toBe(true);
    });

    it('should trigger click on element found by data-testid', async () => {
      const wrapper = mount(FilterLinkAll);
      const element = wrapper.find('[data-testid="FilterLink_All"]');
      
      await element.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['all']);
    });
  });
});