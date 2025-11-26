import { mount } from '@vue/test-utils'
import RemainingCounter from './12_RemainingCounter.vue'

describe('RemainingCounter', () => {
  // Test 1: Component renders with default props
  test('renders with default count of 0 and plural "items"', () => {
    const wrapper = mount(RemainingCounter)
    const counterDiv = wrapper.find('[data-testid="RemainingCounter"]')
    
    expect(counterDiv.exists()).toBe(true)

    const countStrong = counterDiv.find('strong')
    expect(countStrong.text()).toBe('0')

    const textSpan = counterDiv.find('span')
    expect(textSpan.text()).toBe('items left')
  })

  // Test 2: Component renders with a count of 1
  test('renders singular "item" when count is 1', async () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 1,
      },
    })
    const counterDiv = wrapper.find('[data-testid="RemainingCounter"]')
    
    const countStrong = counterDiv.find('strong')
    expect(countStrong.text()).toBe('1')

    const textSpan = counterDiv.find('span')
    expect(textSpan.text()).toBe('item left')
  })

  // Test 3: Component renders with a count greater than 1
  test('renders plural "items" when count is greater than 1', async () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 5,
      },
    })
    const counterDiv = wrapper.find('[data-testid="RemainingCounter"]')

    const countStrong = counterDiv.find('strong')
    expect(countStrong.text()).toBe('5')

    const textSpan = counterDiv.find('span')
    expect(textSpan.text()).toBe('items left')
  })
  
  // Test 4: Component renders with an explicit count of 0
  test('renders plural "items" when count is explicitly set to 0', async () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 0,
      },
    })
    const counterDiv = wrapper.find('[data-testid="RemainingCounter"]')

    const countStrong = counterDiv.find('strong')
    expect(countStrong.text()).toBe('0')

    const textSpan = counterDiv.find('span')
    expect(textSpan.text()).toBe('items left')
  })

  // Test 5: Props update correctly
  test('updates the text when the count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 10,
      },
    })

    // Initial state
    expect(wrapper.find('strong').text()).toBe('10')
    expect(wrapper.find('span').text()).toBe('items left')

    // Update to 1
    await wrapper.setProps({ count: 1 })
    expect(wrapper.find('strong').text()).toBe('1')
    expect(wrapper.find('span').text()).toBe('item left')

    // Update back to plural
    await wrapper.setProps({ count: 2 })
    expect(wrapper.find('strong').text()).toBe('2')
    expect(wrapper.find('span').text()).toBe('items left')
  })
})