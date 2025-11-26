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
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.exists()).toBe(true)
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('renders with correct text content', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.text()).toBe('Clear completed')
    })

    it('has type="button" attribute', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('type')).toBe('button')
    })

    it('has data-testid attribute', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('data-testid')).toBe('ClearCompletedButton')
    })
  })

  describe('props', () => {
    describe('hasCompleted prop', () => {
      it('defaults to false', () => {
        const wrapper = mount(ClearCompletedButton)
        expect(wrapper.props('hasCompleted')).toBe(false)
      })

      it('accepts true value', () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: true }
        })
        expect(wrapper.props('hasCompleted')).toBe(true)
      })

      it('accepts false value', () => {
        const wrapper = mount(ClearCompletedButton, {
          props: { hasCompleted: false }
        })
        expect(wrapper.props('hasCompleted')).toBe(false)
      })
    })
  })

  describe('disabled state', () => {
    it('is disabled when hasCompleted is false', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.element.disabled).toBe(true)
    })

    it('is disabled when hasCompleted is not provided (default)', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.element.disabled).toBe(true)
    })

    it('is enabled when hasCompleted is true', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.element.disabled).toBe(false)
    })

    it('has disabled attribute when hasCompleted is false', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('does not have disabled attribute when hasCompleted is true', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.attributes('disabled')).toBeUndefined()
    })
  })

  describe('click interaction', () => {
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

    it('does not emit clear event when hasCompleted is not provided', async () => {
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

  describe('reactive prop changes', () => {
    it('becomes enabled when hasCompleted changes from false to true', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: false }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      expect(button.element.disabled).toBe(true)
      
      await wrapper.setProps({ hasCompleted: true })
      
      expect(button.element.disabled).toBe(false)
    })

    it('becomes disabled when hasCompleted changes from true to false', async () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      
      expect(button.element.disabled).toBe(false)
      
      await wrapper.setProps({ hasCompleted: false })
      
      expect(button.element.disabled).toBe(true)
    })

    it('starts emitting events after hasCompleted becomes true', async () => {
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

    it('stops emitting events after hasCompleted becomes false', async () => {
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
    it('is focusable when enabled', () => {
      const wrapper = mount(ClearCompletedButton, {
        props: { hasCompleted: true }
      })
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.element.tabIndex).not.toBe(-1)
    })

    it('button element is a native button for accessibility', () => {
      const wrapper = mount(ClearCompletedButton)
      const button = wrapper.find('[data-testid="ClearCompletedButton"]')
      expect(button.element instanceof HTMLButtonElement).toBe(true)
    })
  })
})