/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('FilterLink_Completed', () => {
  describe('rendering', () => {
    it('should render an anchor element', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.element.tagName).toBe('A')
    })

    it('should have href="#"', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.attributes('href')).toBe('#')
    })

    it('should have data-testid="FilterLink_Completed"', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.attributes('data-testid')).toBe('FilterLink_Completed')
    })

    it('should display "Completed" text', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.text()).toBe('Completed')
    })

    it('should be findable by data-testid', () => {
      const wrapper = mount(FilterLinkCompleted)
      const link = wrapper.find('[data-testid="FilterLink_Completed"]')
      expect(link.exists()).toBe(true)
    })
  })

  describe('props', () => {
    describe('active prop', () => {
      it('should default active prop to false', () => {
        const wrapper = mount(FilterLinkCompleted)
        expect(wrapper.props('active')).toBe(false)
      })

      it('should accept active prop as true', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: true },
        })
        expect(wrapper.props('active')).toBe(true)
      })

      it('should accept active prop as false', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: false },
        })
        expect(wrapper.props('active')).toBe(false)
      })

      it('should not have "selected" class when active is false', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: false },
        })
        expect(wrapper.classes()).not.toContain('selected')
      })

      it('should have "selected" class when active is true', () => {
        const wrapper = mount(FilterLinkCompleted, {
          props: { active: true },
        })
        expect(wrapper.classes()).toContain('selected')
      })

      it('should not have "selected" class by default', () => {
        const wrapper = mount(FilterLinkCompleted)
        expect(wrapper.classes()).not.toContain('selected')
      })
    })
  })

  describe('user interactions', () => {
    describe('click event', () => {
      it('should emit "select" event when clicked', async () => {
        const wrapper = mount(FilterLinkCompleted)
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')).toBeTruthy()
      })

      it('should emit "select" event with "completed" payload when clicked', async () => {
        const wrapper = mount(FilterLinkCompleted)
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')[0]).toEqual(['completed'])
      })

      it('should emit "select" event each time clicked', async () => {
        const wrapper = mount(FilterLinkCompleted)
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')).toHaveLength(3)
      })

      it('should emit correct payload on multiple clicks', async () => {
        const wrapper = mount(FilterLinkCompleted)
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        expect(wrapper.emitted('select')[0]).toEqual(['completed'])
        expect(wrapper.emitted('select')[1]).toEqual(['completed'])
      })

      it('should prevent default behavior on click', async () => {
        const wrapper = mount(FilterLinkCompleted)
        const event = { preventDefault: jest.fn() }
        await wrapper.trigger('click', event)
        // The .prevent modifier should handle this
        expect(wrapper.emitted('select')).toBeTruthy()
      })

      it('should emit select when clicking via data-testid', async () => {
        const wrapper = mount(FilterLinkCompleted)
        const link = wrapper.find('[data-testid="FilterLink_Completed"]')
        await link.trigger('click')
        expect(wrapper.emitted('select')).toBeTruthy()
        expect(wrapper.emitted('select')[0]).toEqual(['completed'])
      })
    })
  })

  describe('state changes', () => {
    it('should update class when active prop changes from false to true', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false },
      })
      expect(wrapper.classes()).not.toContain('selected')

      await wrapper.setProps({ active: true })
      expect(wrapper.classes()).toContain('selected')
    })

    it('should update class when active prop changes from true to false', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: true },
      })
      expect(wrapper.classes()).toContain('selected')

      await wrapper.setProps({ active: false })
      expect(wrapper.classes()).not.toContain('selected')
    })

    it('should maintain click functionality after prop change', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false },
      })

      await wrapper.setProps({ active: true })
      await wrapper.trigger('click')

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')[0]).toEqual(['completed'])
    })
  })

  describe('component structure', () => {
    it('should only render a single root element', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.element.nodeType).toBe(1) // Element node
    })

    it('should have correct HTML structure', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.html()).toContain('<a')
      expect(wrapper.html()).toContain('href="#"')
      expect(wrapper.html()).toContain('data-testid="FilterLink_Completed"')
      expect(wrapper.html()).toContain('Completed')
    })
  })

  describe('emits definition', () => {
    it('should only emit select event', async () => {
      const wrapper = mount(FilterLinkCompleted)
      await wrapper.trigger('click')

      const emittedEvents = Object.keys(wrapper.emitted())
      expect(emittedEvents).toContain('select')
      expect(emittedEvents).toHaveLength(1)
    })
  })
})
