import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import DestroyButton from './03_DestroyButton.vue'


describe('DestroyButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DestroyButton);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('rendering', () => {
    it('should render the button element', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.exists()).toBe(true);
    });

    it('should render as a button element', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.element.tagName).toBe('BUTTON');
    });

    it('should have type="button" attribute', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.attributes('type')).toBe('button');
    });

    it('should have aria-label="Delete" for accessibility', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.attributes('aria-label')).toBe('Delete');
    });

    it('should display the × character as content', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.text().trim()).toBe('×');
    });

    it('should have data-testid="DestroyButton" attribute', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.attributes('data-testid')).toBe('DestroyButton');
    });
  });

  describe('user interactions', () => {
    it('should emit "destroy" event when clicked', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      await button.trigger('click');
      
      expect(wrapper.emitted()).toHaveProperty('destroy');
      expect(wrapper.emitted('destroy')).toHaveLength(1);
    });

    it('should emit "destroy" event with no payload', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      await button.trigger('click');
      
      const destroyEvents = wrapper.emitted('destroy');
      expect(destroyEvents[0]).toEqual([]);
    });

    it('should emit "destroy" event multiple times on multiple clicks', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      
      expect(wrapper.emitted('destroy')).toHaveLength(3);
    });

    it('should not emit other events on click', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      await button.trigger('click');
      
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents).toEqual(['destroy']);
    });
  });

  describe('event handling', () => {
    it('should handle click event on the button', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      
      expect(wrapper.emitted('destroy')).toBeUndefined();
      
      await button.trigger('click');
      
      expect(wrapper.emitted('destroy')).toBeDefined();
    });

    it('should trigger onClick function when button is clicked', async () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      await button.trigger('click');
      
      expect(wrapper.emitted('destroy')).toBeTruthy();
    });
  });

  describe('component structure', () => {
    it('should have exactly one root element', () => {
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('should be a valid Vue component instance', () => {
      expect(wrapper.vm).toBeDefined();
    });

    it('should have the correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('DestroyButton');
    });
  });

  describe('accessibility', () => {
    it('should be focusable', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.element.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should have appropriate aria-label for screen readers', () => {
      const button = wrapper.find('[data-testid="DestroyButton"]');
      expect(button.attributes('aria-label')).toBe('Delete');
    });
  });
});