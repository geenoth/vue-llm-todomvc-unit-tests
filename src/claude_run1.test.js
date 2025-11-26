/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import FilterLinkAll from './09_FilterLink_All.vue';



describe('FilterLinkAll', () => {
  describe('rendering', () => {
    it('should render an anchor element', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.element.tagName).toBe('A')
    })

    it('should have href="#"', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.attributes('href')).toBe('#')
    })

    it('should have data-testid="FilterLink_All"', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_All')
    })

    it('should display "All" text', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.text()).toBe('All')
    })

    it('should be found using data-testid', () => {
      const wrapper = mount(FilterLinkAll)
      const link = wrapper.find('[data-testid="FilterLink_All"]')
      expect(link.exists()).toBe(true)
    })
  })

  describe('props', () => {
    describe('active prop', () => {
      it('should default to false', () => {
        const wrapper = mount(FilterLinkAll)
        expect(wrapper.props('active')).toBe(false)
      })

      it('should not have "selected" class when active is false', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: false }
        })
        expect(wrapper.classes()).not.toContain('selected')
      })

      it('should have "selected" class when active is true', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: true }
        })
        expect(wrapper.classes()).toContain('selected')
      })

      it('should accept active prop as true', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: true }
        })
        expect(wrapper.props('active')).toBe(true)
      })

      it('should accept active prop as false explicitly', () => {
        const wrapper = mount(FilterLinkAll, {
          props: { active: false }
        })
        expect(wrapper.props('active')).toBe(false)
      })
    })
  })

  describe('user interactions', () => {
    describe('click events', () => {
      it('should emit "select" event when clicked', async () => {
        const wrapper = mount(FilterLinkAll)
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')).toBeTruthy()
      })

      it('should emit "select" event with "all" payload when clicked', async () => {
        const wrapper = mount(FilterLinkAll)
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')[0]).toEqual(['all'])
      })

      it('should emit "select" event each time clicked', async () => {
        const wrapper = mount(FilterLinkAll)
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')).toHaveLength(3)
      })

      it('should prevent default action on click', async () => {
        const wrapper = mount(FilterLinkAll)
        const event = new Event('click', { cancelable: true })
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault')
        await wrapper.element.dispatchEvent(event)
        expect(preventDefaultSpy).toHaveBeenCalled()
      })

      it('should emit correct payload on multiple clicks', async () => {
        const wrapper = mount(FilterLinkAll)
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')[0]).toEqual(['all'])
        expect(wrapper.emitted('select')[1]).toEqual(['all'])
      })
    })

    describe('click using data-testid', () => {
      it('should emit "select" when clicking element found by data-testid', async () => {
        const wrapper = mount(FilterLinkAll)
        const link = wrapper.find('[data-testid="FilterLink_All"]')
        await link.trigger('click')
        expect(wrapper.emitted('select')).toBeTruthy()
        expect(wrapper.emitted('select')[0]).toEqual(['all'])
      })
    })
  })

  describe('state changes', () => {
    it('should update class when active prop changes from false to true', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      })
      expect(wrapper.classes()).not.toContain('selected')
      await wrapper.setProps({ active: true })
      expect(wrapper.classes()).toContain('selected')
    })

    it('should update class when active prop changes from true to false', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: true }
      })
      expect(wrapper.classes()).toContain('selected')
      await wrapper.setProps({ active: false })
      expect(wrapper.classes()).not.toContain('selected')
    })

    it('should maintain click functionality after prop change', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      })
      await wrapper.setProps({ active: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')[0]).toEqual(['all'])
    })
  })

  describe('edge cases', () => {
    it('should handle rapid clicks', async () => {
      const wrapper = mount(FilterLinkAll)
      const clicks = Array(10).fill(null).map(() => wrapper.trigger('click'))
      await Promise.all(clicks)
      expect(wrapper.emitted('select')).toHaveLength(10)
    })

    it('should render correctly without any props', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toBe('All')
      expect(wrapper.classes()).not.toContain('selected')
    })

    it('should maintain structure after multiple interactions', async () => {
      const wrapper = mount(FilterLinkAll, {
        props: { active: false }
      })
      await wrapper.trigger('click')
      await wrapper.setProps({ active: true })
      await wrapper.trigger('click')
      await wrapper.setProps({ active: false })
      
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('#')
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_All')
      expect(wrapper.text()).toBe('All')
    })
  })

  describe('accessibility', () => {
    it('should be an anchor element for keyboard navigation', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.element.tagName).toBe('A')
    })

    it('should have href attribute for focusability', () => {
      const wrapper = mount(FilterLinkAll)
      expect(wrapper.attributes('href')).toBeDefined()
    })
  })
})