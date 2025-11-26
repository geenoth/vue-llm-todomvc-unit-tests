import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TodoLabel from './08_TodoLabel.vue';


describe('TodoLabel', () => {
  describe('rendering', () => {
    it('should render correctly with default props', () => {
      const wrapper = mount(TodoLabel)
      
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('[data-testid="TodoLabel"]').exists()).toBe(true)
    })

    it('should render as a span element', () => {
      const wrapper = mount(TodoLabel)
      
      expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('should render with empty title by default', () => {
      const wrapper = mount(TodoLabel)
      
      expect(wrapper.text()).toBe('')
    })

    it('should render the title prop correctly', () => {
      const title = 'Test Todo Item'
      const wrapper = mount(TodoLabel, {
        props: { title }
      })
      
      expect(wrapper.text()).toBe(title)
    })

    it('should render with data-testid attribute', () => {
      const wrapper = mount(TodoLabel)
      
      expect(wrapper.attributes('data-testid')).toBe('TodoLabel')
    })
  })

  describe('props', () => {
    it('should accept title as a string', () => {
      const title = 'My Todo'
      const wrapper = mount(TodoLabel, {
        props: { title }
      })
      
      expect(wrapper.props('title')).toBe(title)
    })

    it('should handle empty string title', () => {
      const wrapper = mount(TodoLabel, {
        props: { title: '' }
      })
      
      expect(wrapper.text()).toBe('')
    })

    it('should handle long title text', () => {
      const longTitle = 'This is a very long todo item title that contains many words and characters'
      const wrapper = mount(TodoLabel, {
        props: { title: longTitle }
      })
      
      expect(wrapper.text()).toBe(longTitle)
    })

    it('should handle special characters in title', () => {
      const specialTitle = '<script>alert("xss")</script>'
      const wrapper = mount(TodoLabel, {
        props: { title: specialTitle }
      })
      
      expect(wrapper.text()).toBe(specialTitle)
    })

    it('should handle unicode characters in title', () => {
      const unicodeTitle = '日本語 🎉 émoji'
      const wrapper = mount(TodoLabel, {
        props: { title: unicodeTitle }
      })
      
      expect(wrapper.text()).toBe(unicodeTitle)
    })

    it('should update when title prop changes', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Initial Title' }
      })
      
      expect(wrapper.text()).toBe('Initial Title')
      
      await wrapper.setProps({ title: 'Updated Title' })
      
      expect(wrapper.text()).toBe('Updated Title')
    })
  })

  describe('user interactions', () => {
    it('should emit edit event on double click', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
      
      expect(wrapper.emitted()).toHaveProperty('edit')
      expect(wrapper.emitted('edit')).toHaveLength(1)
    })

    it('should emit edit event multiple times on multiple double clicks', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      const label = wrapper.find('[data-testid="TodoLabel"]')
      
      await label.trigger('dblclick')
      await label.trigger('dblclick')
      await label.trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toHaveLength(3)
    })

    it('should not emit edit event on single click', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('click')
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })

    it('should not emit edit event on mouseenter', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('mouseenter')
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })

    it('should not emit edit event on mouseleave', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('mouseleave')
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })

    it('should not emit edit event on keypress', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test Todo' }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('keypress', { key: 'Enter' })
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })
  })

  describe('emits', () => {
    it('should have edit in emitted events after dblclick', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test' }
      })
      
      await wrapper.trigger('dblclick')
      
      const emittedEvents = wrapper.emitted()
      expect(Object.keys(emittedEvents)).toContain('edit')
    })

    it('should emit edit event with no payload', async () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Test' }
      })
      
      await wrapper.trigger('dblclick')
      
      expect(wrapper.emitted('edit')[0]).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('should handle undefined title gracefully', () => {
      const wrapper = mount(TodoLabel, {
        props: { title: undefined }
      })
      
      expect(wrapper.text()).toBe('')
    })

    it('should handle whitespace-only title', () => {
      const wrapper = mount(TodoLabel, {
        props: { title: '   ' }
      })
      
      expect(wrapper.text()).toBe('   ')
    })

    it('should handle numeric string title', () => {
      const wrapper = mount(TodoLabel, {
        props: { title: '12345' }
      })
      
      expect(wrapper.text()).toBe('12345')
    })

    it('should handle newline characters in title', () => {
      const wrapper = mount(TodoLabel, {
        props: { title: 'Line1\nLine2' }
      })
      
      expect(wrapper.text()).toContain('Line1')
      expect(wrapper.text()).toContain('Line2')
    })
  })

  describe('component structure', () => {
    it('should be a valid Vue component', () => {
      expect(TodoLabel).toBeDefined()
      expect(typeof TodoLabel).toBe('object')
    })

    it('should have the correct component name', () => {
      expect(TodoLabel.name).toBe('TodoLabel')
    })

    it('should mount without errors', () => {
      expect(() => {
        mount(TodoLabel)
      }).not.toThrow()
    })

    it('should unmount without errors', () => {
      const wrapper = mount(TodoLabel)
      
      expect(() => {
        wrapper.unmount()
      }).not.toThrow()
    })
  })
})