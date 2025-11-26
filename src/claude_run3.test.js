import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TodoLabel from './08_TodoLabel.vue';


describe('TodoLabel', () => {
  describe('rendering', () => {
    it('should render correctly with default props', () => {
      const wrapper = mount(TodoLabel)
      const span = wrapper.find('[data-testid="TodoLabel"]')
      expect(span.exists()).toBe(true)
      expect(span.text()).toBe('')
    })

    it('should render with provided title prop', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo Item'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      expect(span.exists()).toBe(true)
      expect(span.text()).toBe('Test Todo Item')
    })

    it('should render empty string when title is empty', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: ''
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      expect(span.text()).toBe('')
    })

    it('should render span element', () => {
      const wrapper = mount(TodoLabel)
      expect(wrapper.element.tagName).toBe('SPAN')
    })
  })

  describe('props', () => {
    it('should accept title as a string', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'My Todo'
        }
      })
      expect(wrapper.props('title')).toBe('My Todo')
    })

    it('should have default empty string for title', () => {
      const wrapper = mount(TodoLabel)
      expect(wrapper.props('title')).toBe('')
    })

    it('should update displayed text when title prop changes', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Initial Title'
        }
      })
      expect(wrapper.text()).toBe('Initial Title')

      await wrapper.setProps({ title: 'Updated Title' })
      expect(wrapper.text()).toBe('Updated Title')
    })

    it('should handle long title text', () => {
      const longTitle = 'A'.repeat(1000)
      const wrapper = mount(TodoLabel, {
        props: {
          title: longTitle
        }
      })
      expect(wrapper.text()).toBe(longTitle)
    })

    it('should handle special characters in title', () => {
      const specialTitle = '<script>alert("xss")</script>'
      const wrapper = mount(TodoLabel, {
        props: {
          title: specialTitle
        }
      })
      expect(wrapper.text()).toBe(specialTitle)
    })
  })

  describe('user interactions', () => {
    it('should emit edit event on double click', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      
      await span.trigger('dblclick')
      
      expect(wrapper.emitted()).toHaveProperty('edit')
      expect(wrapper.emitted('edit')).toHaveLength(1)
    })

    it('should emit edit event multiple times on multiple double clicks', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      
      await span.trigger('dblclick')
      await span.trigger('dblclick')
      await span.trigger('dblclick')
      
      expect(wrapper.emitted('edit')).toHaveLength(3)
    })

    it('should not emit edit event on single click', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      
      await span.trigger('click')
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })

    it('should not emit edit event on other mouse events', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      
      await span.trigger('mousedown')
      await span.trigger('mouseup')
      await span.trigger('mouseover')
      await span.trigger('mouseout')
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })

    it('should not emit edit event on keyboard events', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test Todo'
        }
      })
      const span = wrapper.find('[data-testid="TodoLabel"]')
      
      await span.trigger('keydown', { key: 'Enter' })
      await span.trigger('keyup', { key: 'Enter' })
      await span.trigger('keypress', { key: 'Enter' })
      
      expect(wrapper.emitted('edit')).toBeUndefined()
    })
  })

  describe('data-testid attribute', () => {
    it('should have data-testid attribute set to TodoLabel', () => {
      const wrapper = mount(TodoLabel)
      const span = wrapper.find('[data-testid="TodoLabel"]')
      expect(span.exists()).toBe(true)
      expect(span.attributes('data-testid')).toBe('TodoLabel')
    })
  })

  describe('emits', () => {
    it('should define edit as an emitted event', () => {
      const wrapper = mount(TodoLabel)
      expect(wrapper.vm.$options.emits).toContain('edit')
    })

    it('should emit edit with no payload', async () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: 'Test'
        }
      })
      
      await wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
      
      const editEvents = wrapper.emitted('edit')
      expect(editEvents).toBeDefined()
      expect(editEvents[0]).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('should handle undefined title gracefully', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: undefined
        }
      })
      expect(wrapper.text()).toBe('')
    })

    it('should handle whitespace-only title', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: '   '
        }
      })
      expect(wrapper.text()).toBe('   ')
    })

    it('should handle numeric string title', () => {
      const wrapper = mount(TodoLabel, {
        props: {
          title: '12345'
        }
      })
      expect(wrapper.text()).toBe('12345')
    })

    it('should handle unicode characters in title', () => {
      const unicodeTitle = '日本語 한국어 🎉'
      const wrapper = mount(TodoLabel, {
        props: {
          title: unicodeTitle
        }
      })
      expect(wrapper.text()).toBe(unicodeTitle)
    })
  })
})