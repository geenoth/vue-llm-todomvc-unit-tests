import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import DestroyButton from './03_DestroyButton.vue'



describe('DestroyButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DestroyButton)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('rendering', () => {
    it('should render a button element', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.exists()).toBe(true)
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('should have type="button" attribute', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.attributes('type')).toBe('button')
    })

    it('should have aria-label="Delete" for accessibility', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.attributes('aria-label')).toBe('Delete')
    })

    it('should have data-testid="DestroyButton" attribute', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.attributes('data-testid')).toBe('DestroyButton')
    })

    it('should display × symbol as button text', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.text().trim()).toBe('×')
    })
  })

  describe('user interactions', () => {
    it('should emit "destroy" event when clicked', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      await button.trigger('click')
      
      expect(wrapper.emitted()).toHaveProperty('destroy')
      expect(wrapper.emitted('destroy')).toHaveLength(1)
    })

    it('should emit "destroy" event multiple times on multiple clicks', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')
      
      expect(wrapper.emitted('destroy')).toHaveLength(3)
    })

    it('should emit "destroy" event with no payload', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      await button.trigger('click')
      
      const destroyEvents = wrapper.emitted('destroy')
      expect(destroyEvents[0]).toEqual([])
    })
  })

  describe('event handling', () => {
    it('should call onClick handler when button is clicked', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      await button.trigger('click')
      
      expect(wrapper.emitted('destroy')).toBeTruthy()
    })

    it('should not emit any other events besides destroy on click', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      await button.trigger('click')
      
      const emittedEvents = Object.keys(wrapper.emitted())
      expect(emittedEvents).toEqual(['destroy'])
    })
  })

  describe('component structure', () => {
    it('should have exactly one root element', () => {
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('should be a button that can receive focus', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.element.tabIndex).toBeGreaterThanOrEqual(0)
    })
  })
})