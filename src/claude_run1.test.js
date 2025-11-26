import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import RemainingCounter from './12_RemainingCounter.vue';



describe('RemainingCounter', () => {
  it('renders correctly with default count of 0', () => {
    const wrapper = mount(RemainingCounter)
    
    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('0')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('renders "items" (plural) when count is 0', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 }
    })
    
    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('items left')
  })

  it('renders "item" (singular) when count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    })
    
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.find('span').text()).toBe(' item left')
  })

  it('renders "items" (plural) when count is 2', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    })
    
    expect(wrapper.find('strong').text()).toBe('2')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('renders "items" (plural) when count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    })
    
    expect(wrapper.find('strong').text()).toBe('5')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('renders correctly with large count', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 100 }
    })
    
    expect(wrapper.find('strong').text()).toBe('100')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('updates display when count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    })
    
    expect(wrapper.find('strong').text()).toBe('5')
    expect(wrapper.find('span').text()).toBe(' items left')
    
    await wrapper.setProps({ count: 1 })
    
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.find('span').text()).toBe(' item left')
  })

  it('updates from singular to plural when count changes from 1 to 2', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    })
    
    expect(wrapper.text()).toContain('item left')
    expect(wrapper.text()).not.toContain('items left')
    
    await wrapper.setProps({ count: 2 })
    
    expect(wrapper.text()).toContain('items left')
  })

  it('updates from plural to singular when count changes to 1', async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 }
    })
    
    expect(wrapper.text()).toContain('items left')
    
    await wrapper.setProps({ count: 1 })
    
    expect(wrapper.text()).toContain('item left')
    expect(wrapper.text()).not.toContain('items left')
  })

  it('has correct HTML structure', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 3 }
    })
    
    const container = wrapper.find('[data-testid="RemainingCounter"]')
    expect(container.exists()).toBe(true)
    expect(container.find('strong').exists()).toBe(true)
    expect(container.find('span').exists()).toBe(true)
  })

  it('displays count in strong element', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 42 }
    })
    
    const strong = wrapper.find('strong')
    expect(strong.text()).toBe('42')
  })

  it('handles count of 0 correctly with plural form', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 }
    })
    
    expect(wrapper.text()).toBe('0 items left')
  })

  it('handles count of 1 correctly with singular form', () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    })
    
    expect(wrapper.text()).toBe('1 item left')
  })
})