import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel', () => {
  describe('rendering', () => {
    it('should render a span element', () => {
      const wrapper = mount(TodoLabel);
      expect(wrapper.find('span').exists()).toBe(true);
    });

    it('should have data-testid attribute set to TodoLabel', () => {
      const wrapper = mount(TodoLabel);
      expect(wrapper.find('[data-testid="TodoLabel"]').exists()).toBe(true);
    });

    it('should render with empty title by default', () => {
      const wrapper = mount(TodoLabel);
      expect(wrapper.text()).toBe('');
    });

    it('should render the title prop correctly', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo Item'
        }
      });
      expect(wrapper.text()).toBe('Test Todo Item');
    });

    it('should render with special characters in title', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: '<script>alert("xss")</script>'
        }
      });
      expect(wrapper.text()).toBe('<script>alert("xss")</script>');
    });

    it('should render with unicode characters in title', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: '日本語テスト 🎉'
        }
      });
      expect(wrapper.text()).toBe('日本語テスト 🎉');
    });

    it('should render with long title text', () => {
      const longTitle = 'A'.repeat(1000);
      const wrapper = mount(TodoLabel, {
        props: {
          title: longTitle
        }
      });
      expect(wrapper.text()).toBe(longTitle);
    });
  });

  describe('props', () => {
    it('should accept title as a string prop', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'My Todo'
        }
      });
      expect(wrapper.props('title')).toBe('My Todo');
    });

    it('should have default empty string for title prop', () => {
      const wrapper = mount(TodoLabel);
      expect(wrapper.props('title')).toBe('');
    });

    it('should update when title prop changes', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Initial Title'
        }
      });
      expect(wrapper.text()).toBe('Initial Title');

      await wrapper.setProps({ title: 'Updated Title' });
      expect(wrapper.text()).toBe('Updated Title');
    });

    it('should handle whitespace-only title', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: '   '
        }
      });
      expect(wrapper.text()).toBe('   ');
    });
  });

  describe('user interactions', () => {
    it('should emit edit event on double click', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick');
      
      expect(wrapper.emitted()).toHaveProperty('edit');
      expect(wrapper.emitted('edit')).toHaveLength(1);
    });

    it('should emit edit event multiple times on multiple double clicks', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      const span = wrapper.find('[data-testid="TodoLabel"]');
      
      await span.trigger('dblclick');
      await span.trigger('dblclick');
      await span.trigger('dblclick');
      
      expect(wrapper.emitted('edit')).toHaveLength(3);
    });

    it('should not emit edit event on single click', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      await wrapper.find('[data-testid="TodoLabel"]').trigger('click');
      
      expect(wrapper.emitted('edit')).toBeUndefined();
    });

    it('should not emit edit event on other mouse events', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      const span = wrapper.find('[data-testid="TodoLabel"]');
      
      await span.trigger('mousedown');
      await span.trigger('mouseup');
      await span.trigger('mouseenter');
      await span.trigger('mouseleave');
      
      expect(wrapper.emitted('edit')).toBeUndefined();
    });

    it('should emit edit event with empty payload', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick');
      
      expect(wrapper.emitted('edit')[0]).toEqual([]);
    });
  });

  describe('emits', () => {
    it('should have edit as an emittable event', () => {
      const wrapper = mount(TodoLabel);
      expect(wrapper.vm.$options.emits).toContain('edit');
    });
  });

  describe('accessibility', () => {
    it('should be focusable via double click interaction', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Accessible Todo'
        }
      });

      const span = wrapper.find('[data-testid="TodoLabel"]');
      expect(span.exists()).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid double clicks', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      });

      const span = wrapper.find('[data-testid="TodoLabel"]');
      
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(span.trigger('dblclick'));
      }
      await Promise.all(promises);
      
      expect(wrapper.emitted('edit')).toHaveLength(10);
    });

    it('should work with empty string title and emit on double click', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: ''
        }
      });

      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick');
      
      expect(wrapper.emitted('edit')).toHaveLength(1);
    });

    it('should maintain functionality after prop update', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Original'
        }
      });

      await wrapper.setProps({ title: 'Changed' });
      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick');
      
      expect(wrapper.emitted('edit')).toHaveLength(1);
      expect(wrapper.text()).toBe('Changed');
    });
  });
});