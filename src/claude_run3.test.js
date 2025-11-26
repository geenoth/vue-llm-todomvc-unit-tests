/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  describe('rendering', () => {
    it('renders a button element', () => {
      const wrapper = mount(ClearCompletedButton)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders with correct data-testid attribute', () => {
      const wrapper = mount(ClearCompletedButton)
      expect(wrapper.find('[data-testid="ClearCompletedButton"]').exists()).toBe(true)
    })

    it('renders with type="button" attribute', () => {
      const wrapper = mount(ClearCompletedButton)
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })

    it('renders with correct text content', () => {
      const wrapper = mount(ClearCompletedButton)
      expect(wrapper.find('button').text()).toBe('Clear completed')
    })
  })

  describe('props', () => {
    describe('hasCompleted prop', () => {
      it('defaults to false when not provided', () => {
        const wrapper = mount(ClearCompletedButton)
        expect(wrapper.props('hasCompleted')).toBe(false)
      })

      it('accepts hasCompleted as true', () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: true }
        })
        expect(wrapper.props('hasCompleted')).toBe(true)
      })

      it('accepts hasCompleted as false', () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: false }
        })
        expect(wrapper.props('hasCompleted')).toBe(false)
      })
    })
  })

  describe('disabled state', () => {
    it('is disabled when hasCompleted is false (default)', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('is disabled when hasCompleted is explicitly false', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('is enabled when hasCompleted is true', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('button element has disabled property set correctly when hasCompleted is false', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('button').element
      expect(button.disabled).toBe(true)
    })

    it('button element has disabled property set correctly when hasCompleted is true', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('button').element
      expect(button.disabled).toBe(false)
    })
  })

  describe('user interactions', () => {
    describe('click event', () => {
      it('emits clear event when clicked and hasCompleted is true', async () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: true }
        })
        const button = wrapper.find('[data-testid="ClearCompletedButton"]')
        
        await button.trigger('click')
        
        expect(wrapper.emitted('clear')).toBeTruthy()
        expect(wrapper.emitted('clear')).toHaveLength(1)
      })

      it('does not emit clear event when clicked and hasCompleted is false', async () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: false }
        })
        const button = wrapper.find('[data-testid="ClearCompletedButton"]')
        
        await button.trigger('click')
        
        expect(wrapper.emitted('clear')).toBeFalsy()
      })

      it('does not emit clear event when clicked with default props', async () => {
        const wrapper = mount(ClearCompletedButton)
        const button = wrapper.find('[data-testid="ClearCompletedButton"]')
        
        await button.trigger('click')
        
        expect(wrapper.emitted('clear')).toBeFalsy()
      })

      it('emits clear event multiple times on multiple clicks when enabled', async () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: true }
        })
        const button = wrapper.find('[data-testid="ClearCompletedButton"]')
        
        await button.trigger('click')
        await button.trigger('click')
        await button.trigger('click')
        
        expect(wrapper.emitted('clear')).toHaveLength(3)
      })

      it('emits clear event with no payload', async () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: true }
        })
        const button = wrapper.find('[data-testid="ClearCompletedButton"]')
        
        await button.trigger('click')
        
        expect(wrapper.emitted('clear')[0]).toEqual([])
      })
    })
  })

  describe('state changes', () => {
    it('becomes enabled when hasCompleted changes from false to true', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      expect(button.attributes('disabled')).toBeDefined()
      
      await wrapper.setProps({ hasCompleted: true })
      
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('becomes disabled when hasCompleted changes from true to false', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      expect(button.attributes('disabled')).toBeUndefined()
      
      await wrapper.setProps({ hasCompleted: false })
      
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('starts emitting events after hasCompleted changes to true', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      await button.trigger('click')
      expect(wrapper.emitted('clear')).toBeFalsy()
      
      await wrapper.setProps({ hasCompleted: true })
      await button.trigger('click')
      
      expect(wrapper.emitted('clear')).toBeTruthy()
      expect(wrapper.emitted('clear')).toHaveLength(1)
    })

    it('stops emitting events after hasCompleted changes to false', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      await button.trigger('click')
      expect(wrapper.emitted('clear')).toHaveLength(1)
      
      await wrapper.setProps({ hasCompleted: false })
      await button.trigger('click')
      
      expect(wrapper.emitted('clear')).toHaveLength(1)
    })
  })

  describe('accessibility', () => {
    it('button is focusable when enabled', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('button').element
      expect(button.tabIndex).toBeGreaterThanOrEqual(0)
    })

    it('has descriptive text content for screen readers', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('button')
      expect(button.text().trim()).toBe('Clear completed')
    })
  })
})