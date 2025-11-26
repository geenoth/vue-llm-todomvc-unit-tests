import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import RemainingCounter from './12_RemainingCounter.vue';


describe('RemainingCounter', () => {
  describe('rendering', () => {
    it('should render the component with data-testid', () => {
      const wrapper = mount(RemainingCounter)
      expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
    })

    it('should render with default count of 0', () => {
      const wrapper = mount(RemainingCounter)
      expect(wrapper.find('strong').text()).toBe('0')
    })

    it('should render the count in a strong element', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 5 }
      })
      expect(wrapper.find('strong').text()).toBe('5')
    })
  })

  describe('props', () => {
    it('should accept count prop', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 10 }
      })
      expect(wrapper.find('strong').text()).toBe('10')
    })

    it('should handle count of 0', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 0 }
      })
      expect(wrapper.find('strong').text()).toBe('0')
    })

    it('should handle large count values', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 9999 }
      })
      expect(wrapper.find('strong').text()).toBe('9999')
    })
  })

  describe('pluralization', () => {
    it('should display "item" (singular) when count is 1', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 1 }
      })
      expect(wrapper.find('span').text()).toBe(' item left')
      expect(wrapper.text()).toBe('1 item left')
    })

    it('should display "items" (plural) when count is 0', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 0 }
      })
      expect(wrapper.find('span').text()).toBe(' items left')
      expect(wrapper.text()).toBe('0 items left')
    })

    it('should display "items" (plural) when count is 2', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 2 }
      })
      expect(wrapper.find('span').text()).toBe(' items left')
      expect(wrapper.text()).toBe('2 items left')
    })

    it('should display "items" (plural) when count is greater than 1', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 5 }
      })
      expect(wrapper.find('span').text()).toBe(' items left')
      expect(wrapper.text()).toBe('5 items left')
    })

    it('should display "items" (plural) when count is 100', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 100 }
      })
      expect(wrapper.text()).toBe('100 items left')
    })
  })

  describe('reactivity', () => {
    it('should update display when count prop changes', async () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 5 }
      })
      expect(wrapper.text()).toBe('5 items left')

      await wrapper.setProps({ count: 1 })
      expect(wrapper.text()).toBe('1 item left')

      await wrapper.setProps({ count: 0 })
      expect(wrapper.text()).toBe('0 items left')
    })

    it('should update pluralization when changing from 1 to 2', async () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 1 }
      })
      expect(wrapper.find('span').text()).toContain('item left')

      await wrapper.setProps({ count: 2 })
      expect(wrapper.find('span').text()).toContain('items left')
    })

    it('should update pluralization when changing from 2 to 1', async () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 2 }
      })
      expect(wrapper.find('span').text()).toContain('items left')

      await wrapper.setProps({ count: 1 })
      expect(wrapper.find('span').text()).toContain('item left')
    })
  })

  describe('structure', () => {
    it('should have correct HTML structure', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 3 }
      })
      const rootDiv = wrapper.find('[data-testid="RemainingCounter"]')
      expect(rootDiv.exists()).toBe(true)
      expect(rootDiv.find('strong').exists()).toBe(true)
      expect(rootDiv.find('span').exists()).toBe(true)
    })

    it('should contain strong element with count value', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 7 }
      })
      const strong = wrapper.find('strong')
      expect(strong.exists()).toBe(true)
      expect(strong.text()).toBe('7')
    })

    it('should contain span element with items text', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 3 }
      })
      const span = wrapper.find('span')
      expect(span.exists()).toBe(true)
      expect(span.text()).toContain('items left')
    })
  })

  describe('edge cases', () => {
    it('should handle negative count', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: -1 }
      })
      expect(wrapper.find('strong').text()).toBe('-1')
      expect(wrapper.find('span').text()).toContain('items left')
    })

    it('should handle very large numbers', () => {
      const wrapper = mount(RemainingCounter, {
        props: { count: 1000000 }
      })
      expect(wrapper.find('strong').text()).toBe('1000000')
      expect(wrapper.text()).toBe('1000000 items left')
    })
  })
})