import { shallowMount } from '@vue/test-utils'
import RemainingCounter from './12_RemainingCounter.vue';

describe('RemainingCounter', () => {
  it('renders correctly with count 0', () => {
    const wrapper = shallowMount(RemainingCounter)
    expect(wrapper.find('[data-testid="RemainingCounter"]').text()).toBe('0 items left')
  })

  it('renders correctly with count 1', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 1 }
    })
    expect(wrapper.find('[data-testid="RemainingCounter"]').text()).toBe('1 item left')
  })

  it('renders correctly with count > 1', () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 5 }
    })
    expect(wrapper.find('[data-testid="RemainingCounter"]').text()).toBe('5 items left')
  })

  it('updates render when count prop changes', async () => {
    const wrapper = shallowMount(RemainingCounter, {
      props: { count: 1 }
    })
    await wrapper.setProps({ count: 5 })
    expect(wrapper.find('[data-testid="RemainingCounter"]').text()).toBe('5 items left')
  })
})