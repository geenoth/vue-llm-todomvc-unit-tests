/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import FilterLinkCompleted from './11_FilterLink_Completed.vue';



describe('FilterLink_Completed', () => {
  describe('rendering', () => {
    it('renders an anchor element', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.find('a').exists()).toBe(true)
    })

    it('renders with correct text content "Completed"', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.text()).toBe('Completed')
    })

    it('has href="#" attribute', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.attributes('href')).toBe('#')
    })

    it('has correct data-testid attribute', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.find('[data-testid="FilterLink_Completed"]').exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('has active prop defaulting to false', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.props('active')).toBe(false)
    })

    it('accepts active prop as true', () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: true }
      })
      expect(wrapper.props('active')).toBe(true)
    })

    it('accepts active prop as false explicitly', () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false }
      })
      expect(wrapper.props('active')).toBe(false)
    })
  })

  describe('CSS classes', () => {
    it('does not have "selected" class when active is false', () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false }
      })
      expect(wrapper.classes()).not.toContain('selected')
    })

    it('has "selected" class when active is true', () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: true }
      })
      expect(wrapper.classes()).toContain('selected')
    })

    it('does not have "selected" class by default', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.classes()).not.toContain('selected')
    })
  })

  describe('user interactions', () => {
    it('emits "select" event when clicked', async () => {
      const wrapper = mount(FilterLinkCompleted)
      await wrapper.find('a').trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
    })

    it('emits "select" event with "completed" payload when clicked', async () => {
      const wrapper = mount(FilterLinkCompleted)
      await wrapper.find('a').trigger('click')
      expect(wrapper.emitted('select')[0]).toEqual(['completed'])
    })

    it('emits "select" event multiple times on multiple clicks', async () => {
      const wrapper = mount(FilterLinkCompleted)
      const link = wrapper.find('a')
      
      await link.trigger('click')
      await link.trigger('click')
      await link.trigger('click')
      
      expect(wrapper.emitted('select')).toHaveLength(3)
    })

    it('each click emits "completed" as payload', async () => {
      const wrapper = mount(FilterLinkCompleted)
      const link = wrapper.find('a')
      
      await link.trigger('click')
      await link.trigger('click')
      
      expect(wrapper.emitted('select')[0]).toEqual(['completed'])
      expect(wrapper.emitted('select')[1]).toEqual(['completed'])
    })

    it('prevents default click behavior', async () => {
      const wrapper = mount(FilterLinkCompleted)
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
      
      const preventDefault = jest.fn()
      Object.defineProperty(clickEvent, 'preventDefault', {
        value: preventDefault
      })
      
      wrapper.find('a').element.dispatchEvent(clickEvent)
      
      expect(preventDefault).toHaveBeenCalled()
    })

    it('emits event using data-testid selector', async () => {
      const wrapper = mount(FilterLinkCompleted)
      await wrapper.find('[data-testid="FilterLink_Completed"]').trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')[0]).toEqual(['completed'])
    })
  })

  describe('reactivity', () => {
    it('updates class when active prop changes from false to true', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: false }
      })
      
      expect(wrapper.classes()).not.toContain('selected')
      
      await wrapper.setProps({ active: true })
      
      expect(wrapper.classes()).toContain('selected')
    })

    it('updates class when active prop changes from true to false', async () => {
      const wrapper = mount(FilterLinkCompleted, {
        props: { active: true }
      })
      
      expect(wrapper.classes()).toContain('selected')
      
      await wrapper.setProps({ active: false })
      
      expect(wrapper.classes()).not.toContain('selected')
    })
  })

  describe('accessibility', () => {
    it('is a clickable anchor element', () => {
      const wrapper = mount(FilterLinkCompleted)
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBeDefined()
    })

    it('has accessible text content', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.text().trim()).toBe('Completed')
    })
  })

  describe('component structure', () => {
    it('has only one root element', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.element.tagName).toBe('A')
    })

    it('does not have child elements other than text', () => {
      const wrapper = mount(FilterLinkCompleted)
      expect(wrapper.find('a').element.children.length).toBe(0)
    })
  })
})