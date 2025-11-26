import { shallowMount } from '@vue/test-utils'
import RemainingCounter from './12_RemainingCounter.vue';

describe('RemainingCounter.vue', () => {
  it('renders correctly with count 0', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 0 },
    })

    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('0')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('renders correctly with count 1', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 1 },
    })

    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.find('span').text()).toBe(' item left')
  })

  it('renders correctly with count 2', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 2 },
    })

    expect(wrapper.find('[data-testid="RemainingCounter"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('2')
    expect(wrapper.find('span').text()).toBe(' items left')
  })

  it('updates count when prop changes', async () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 0 },
    })

    await wrapper.setProps({ count: 1 })

    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.find('span').text()).toBe(' item left')
  })
})