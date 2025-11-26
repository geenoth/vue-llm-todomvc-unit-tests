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

    it('should render with correct text content "All"', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.text()).toBe('All');
    });

    it('should have href="#" attribute', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.attributes('href')).toBe('#');
    });

    it('should have data-testid="FilterLink_All" attribute', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_All');
    });

    it('should be found by data-testid', () => {
      const wrapper = mount(FilterLinkAll);
      const link = wrapper.find('[data-testid="FilterLink_All"]');
      expect(link.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    describe('active prop', () => {
      it('should default to false when not provided', () => {
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

      it('should have "selected" class when active is true', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: true }
        });
        expect(wrapper.classes()).toContain('selected');
      });

      it('should not have "selected" class when active is false', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: false }
        });
        expect(wrapper.classes()).not.toContain('selected');
      });

      it('should not have "selected" class when active prop is not provided', () => {
        const wrapper = mount(FilterLinkAll);
        expect(wrapper.classes()).not.toContain('selected');
      });

      it('should update "selected" class when active prop changes from false to true', async () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: false }
        });
        expect(wrapper.classes()).not.toContain('selected');
        
        await wrapper.setProps({ active: true });
        expect(wrapper.classes()).toContain('selected');
      });

      it('should update "selected" class when active prop changes from true to false', async () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: true }
        });
        expect(wrapper.classes()).toContain('selected');
        
        await wrapper.setProps({ active: false });
        expect(wrapper.classes()).not.toContain('selected');
      });
    });
  });

  describe('User Interactions', () => {
    describe('Click events', () => {
      it('should emit "select" event when clicked', async () => {
        const wrapper = mount(FilterLinkAll);
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
      });

      it('should emit "select" event with "all" payload when clicked', async () => {
        const wrapper = mount(FilterLinkAll);
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')[0]).toEqual(['all']);
      });

      it('should emit "select" event each time it is clicked', async () => {
        const wrapper = mount(FilterLinkAll);
        
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        
        expect(wrapper.emitted('select')).toHaveLength(3);
      });

      it('should emit "select" with "all" payload on every click', async () => {
        const wrapper = mount(FilterLinkAll);
        
        await wrapper.trigger('click');
        await wrapper.trigger('click');
        
        expect(wrapper.emitted('select')[0]).toEqual(['all']);
        expect(wrapper.emitted('select')[1]).toEqual(['all']);
      });

      it('should prevent default action on click', async () => {
        const wrapper = mount(FilterLinkAll);
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        });
        
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.element.dispatchEvent(event);
        
        expect(preventDefaultSpy).toHaveBeenCalled();
      });

      it('should emit event when clicked regardless of active state being true', async () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: true }
        });
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')[0]).toEqual(['all']);
      });

      it('should emit event when clicked regardless of active state being false', async () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: false }
        });
        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')[0]).toEqual(['all']);
      });
    });
  });

  describe('Emits', () => {
    it('should have "select" in emitted events after click', async () => {
      const wrapper = mount(FilterLinkAll);
      await wrapper.trigger('click');
      const emittedEvents = wrapper.emitted();
      expect(emittedEvents).toHaveProperty('select');
    });

    it('should not emit any events on mount', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.emitted('select')).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should be an anchor element for keyboard navigation', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.element.tagName).toBe('A');
    });

    it('should have a valid href attribute', () => {
      const wrapper = mount(FilterLinkAll);
      expect(wrapper.attributes('href')).toBeDefined();
    });
  });

  describe('Snapshot', () => {
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
});