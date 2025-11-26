/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import FilterLinkCompleted from './11_FilterLink_Completed.vue';



describe('FilterLink_Completed', () => {
  describe('rendering', () => {
    it('should render an anchor element', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.element.tagName).toBe('A');
    });

    it('should have the correct data-testid attribute', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_Completed');
    });

    it('should have href="#"', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.attributes('href')).toBe('#');
    });

    it('should display "Completed" text', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.text()).toBe('Completed');
    });

    it('should be selectable by data-testid', () => {
      const wrapper = mount(FilterLinkCompleted);
      const link = wrapper.find('[data-testid="FilterLink_Completed"]');
      expect(link.exists()).toBe(true);
    });
  });

  describe('props', () => {
    describe('active prop', () => {
      it('should default to false', () => {
        const wrapper = mount(FilterLinkCompleted);
        expect(wrapper.props('active')).toBe(false);
      });

      it('should accept true value', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: true }
        });
        expect(wrapper.props('active')).toBe(true);
      });

      it('should accept false value', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: false }
        });
        expect(wrapper.props('active')).toBe(false);
      });
    });

    describe('selected class based on active prop', () => {
      it('should not have "selected" class when active is false', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: false }
        });
        expect(wrapper.classes()).not.toContain('selected');
      });

      it('should have "selected" class when active is true', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: true }
        });
        expect(wrapper.classes()).toContain('selected');
      });

      it('should not have "selected" class when active prop is not provided', () => {
        const wrapper = mount(FilterLinkCompleted);
        expect(wrapper.classes()).not.toContain('selected');
      });
    });
  });

  describe('user interactions', () => {
    describe('click event', () => {
      it('should emit "select" event when clicked', async () => {
        const wrapper = mount(FilterLinkCompleted);
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
      });

      it('should emit "select" event with "completed" payload', async () => {
        const wrapper = mount(FilterLinkCompleted);
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')[0]).toEqual(['completed']);
      });

      it('should emit "select" event each time clicked', async () => {
        const wrapper = mount(FilterLinkCompleted);
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toHaveLength(3);
      });

      it('should always emit "completed" as payload on each click', async () => {
        const wrapper = mount(FilterLinkCompleted);
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')[0]).toEqual(['completed']);
        expect(wrapper.emitted('select')[1]).toEqual(['completed']);
      });

      it('should prevent default behavior on click', async () => {
        const wrapper = mount(FilterLinkCompleted);
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        
        wrapper.element.dispatchEvent(event);
        
        expect(preventDefaultSpy).toHaveBeenCalled();
      });
    });

    describe('click on element found by data-testid', () => {
      it('should emit "select" event when clicking element found by data-testid', async () => {
        const wrapper = mount(FilterLinkCompleted);
        const link = wrapper.find('[data-testid="FilterLink_Completed"]');
        await link.trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')[0]).toEqual(['completed']);
      });
    });
  });

  describe('state changes', () => {
    it('should update "selected" class when active prop changes from false to true', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false }
      });
      expect(wrapper.classes()).not.toContain('selected');
      
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('selected');
    });

    it('should update "selected" class when active prop changes from true to false', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: true }
      });
      expect(wrapper.classes()).toContain('selected');
      
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('selected');
    });

    it('should maintain click functionality after prop changes', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false }
      });
      
      await wrapper.setProps({ active: true });
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('select')[0]).toEqual(['completed']);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid consecutive clicks', async () => {
      const wrapper = mount(FilterLinkCompleted);
      
      const clicks = [];
      for (let i = 0; i < 10; i++) {
        clicks.push(wrapper.trigger('click'));
      }
      await Promise.all(clicks);
      
      expect(wrapper.emitted('select')).toHaveLength(10);
    });

    it('should work correctly when mounted multiple times', () => {
      const wrapper1 = mount(FilterLinkCompleted, { props: { active: true } });
      const wrapper2 = mount(FilterLinkCompleted, { props: { active: false } });
      
      expect(wrapper1.classes()).toContain('selected');
      expect(wrapper2.classes()).not.toContain('selected');
    });

    it('should not emit any events on mount', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.emitted('select')).toBeFalsy();
    });
  });

  describe('accessibility', () => {
    it('should be a clickable link element', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.element.tagName).toBe('A');
      expect(wrapper.attributes('href')).toBeDefined();
    });

    it('should have visible text content', () => {
      const wrapper = mount(FilterLinkCompleted);
      expect(wrapper.text().trim()).toBe('Completed');
    });
  });
});