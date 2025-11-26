import { mount } from '@vue/test-utils'
import RemainingCounter from './12_RemainingCounter.vue'

describe('RemainingCounter', () => {
  // Test 1: Correct rendering with default props
  test('renders with default count of 0', () => {
    const wrapper = mount(RemainingCounter)

    // Check if the main div exists using data-testid
    const counterElement = wrapper.find('[data-testid="RemainingCounter"]')
    expect(counterElement.exists()).toBe(true)

    // Check the strong tag for the count
    const countElement = wrapper.find('strong')
    expect(countElement.text()).toBe('0')

    // Check the full text content, which should be plural "items"
    expect(wrapper.text()).toBe('0 items left')
  })

  // Test 2: Prop handling for a single item (singular text)
  test('renders singular "item" when count is 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 1,
      },
    })

    // Check the strong tag for the count
    const countElement = wrapper.find('strong')
    expect(countElement.text()).toBe('1')

    // Check the full text content, which should be singular "item"
    expect(wrapper.text()).toBe('1 item left')
  })

  // Test 3: Prop handling for multiple items (plural text)
  test('renders plural "items" when count is greater than 1', () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 5,
      },
    })

    // Check the strong tag for the count
    const countElement = wrapper.find('strong')
    expect(countElement.text()).toBe('5')

    // Check the full text content, which should be plural "items"
    expect(wrapper.text()).toBe('5 items left')
  })

  // Test 4: State changes when props are updated
  test('updates the text when the count prop changes', async () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: 10,
      },
    })

    // Initial state check
    expect(wrapper.text()).toBe('10 items left')

    // Update props to 1 and check for singular text
    await wrapper.setProps({ count: 1 })
    expect(wrapper.text()).toBe('1 item left')

    // Update props to 0 and check for plural text
    await wrapper.setProps({ count: 0 })
    expect(wrapper.text()).toBe('0 items left')

    // Update props to a new plural value
    await wrapper.setProps({ count: 99 })
    expect(wrapper.text()).toBe('99 items left')
  })

  // Test 5: Prop handling for negative numbers (edge case)
  test('renders plural "items" when count is a negative number', () => {
    const wrapper = mount(RemainingCounter, {
      props: {
        count: -5,
      },
    })

    // Check the strong tag for the count
    const countElement = wrapper.find('strong')
    expect(countElement.text()).toBe('-5')

    // Negative numbers are not equal to 1, so it should be plural
    expect(wrapper.text()).toBe('-5 items left')
  })
})