import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import RemainingCounter from './12_RemainingCounter.vue';


describe('RemainingCounter', () => {
  it('renders the component with data-testid', () => {
    const wrapper = mount(RemainingCounter)
    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
  })

  it('renders with default count of 0', () => {
    const wrapper = mount(RemainingCounter)
    expect(wrapper.find('strong').text()).toBe('0')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('renders "items" (plural) when count is 0', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 }
    })
    expect(wrapper.text()).toContain('items left')
  })

  it('renders "item" (singular) when count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    })
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.text()).toContain('item left')
    expect(wrapper.text()).not.toContain('items left')
  })

  it('renders "items" (plural) when count is 2', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    })
    expect(wrapper.find('strong').text()).toBe('2')
    expect(wrapper.text()).toContain('items left')
  })

  it('renders "items" (plural) when count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    })
    expect(wrapper.find('strong').text()).toBe('5')
    expect(wrapper.text()).toContain('items left')
  })

  it('renders "items" (plural) when count is a large number', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 100 }
    })
    expect(wrapper.find('strong').text()).toBe('100')
    expect(wrapper.text()).toContain('items left')
  })

  it('updates display when count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    })
    expect(wrapper.find('strong').text()).toBe('5')
    expect(wrapper.text()).toContain('items left')

    await wrapper.setProps({ count: 1 })
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.text()).toContain('item left')
    expect(wrapper.text()).not.toContain('items left')

    await wrapper.setProps({ count: 0 })
    expect(wrapper.find('strong').text()).toBe('0')
    expect(wrapper.text()).toContain('items left')
  })

  it('renders count inside strong element', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 7 }
    })
    const strong = wrapper.find('strong')
    expect(strong.exists()).toBe(true)
    expect(strong.text()).toBe('7')
  })

  it('renders text inside span element', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 }
    })
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.text()).toContain('items left')
  })

  it('has correct structure with strong and span elements', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 4 }
    })
    const container = wrapper.find('[data-testid="RemainingCounter"]')
    expect(container.find('strong').exists()).toBe(true)
    expect(container.find('span').exists()).toBe(true)
  })

  it('handles transition from plural to singular correctly', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    })
    expect(wrapper.text()).toContain('items left')

    await wrapper.setProps({ count: 1 })
    expect(wrapper.text()).toContain('item left')
    expect(wrapper.text()).not.toContain('items left')
  })

  it('handles transition from singular to plural correctly', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    })
    expect(wrapper.text()).toContain('item left')

    await wrapper.setProps({ count: 2 })
    expect(wrapper.text()).toContain('items left')
  })

  it('accepts count prop of type Number', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 10 }
    })
    expect(wrapper.props('count')).toBe(10)
  })
})