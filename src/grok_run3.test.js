import { mount } from '@vue/test-utils'
import FilterLink_All from './09_FilterLink_All.vue';

describe('FilterLink_All', () => {
  test('renders correctly with default props', () => {
    const wrapper = mount(FilterLink_All)
    expect(wrapper.find('[data-testid="FilterLink_All"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="FilterLink_All"]').text()).toBe('All')
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected')
  })

  test('renders correctly when active prop is true', () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: true }
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).toContain('selected')
  })

  test('renders correctly when active prop is false', () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false }
    })
    expect(wrapper.find('[data-testid="FilterLink_All"]').classes()).not.toContain('selected')
  })

  test('emits select event with "all" when clicked', async () => {
    const wrapper = mount(FilterLink_All)
    await wrapper.find('[data-testid="FilterLink_All"]').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual(['all'])
  })

  test('prevents default behavior on click', async () => {
    const wrapper = mount(FilterLink_All)
    const event = new Event('click', { bubbles: true, cancelable: true })
    const link = wrapper.find('[data-testid="FilterLink_All"]').element
    link.dispatchEvent(event)
    await wrapper.vm.$nextTick()
    expect(event.defaultPrevented).toBe(true)
  })
})