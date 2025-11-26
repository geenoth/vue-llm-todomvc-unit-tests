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

    it('should display × character as button content', () => {
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
      
      const emittedEvents = wrapper.emitted('destroy')
      expect(emittedEvents[0]).toEqual([])
    })
  })

  describe('emits configuration', () => {
    it('should have destroy in emits definition', () => {
      expect(wrapper.vm.$options.emits).toContain('destroy')
    })
  })

  describe('button behavior', () => {
    it('should not submit a form (type="button")', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.attributes('type')).not.toBe('submit')
    })

    it('should be clickable (not disabled by default)', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]')
      expect(button.attributes('disabled')).toBeUndefined()
    })
  })
})