import { mount } from '@vue/test-utils'
import FilterLink_All from './09_FilterLink_All.vue';

describe('FilterLink_All', () => {
  test('renders correctly with default props', () => {
    const wrapper = mount(FilterLink_All)
    expect(wrapper.get('[data-testid="FilterLink_All"]').text()).toBe('All')
    expect(wrapper.classes()).not.toContain('selected')
  })

  test('renders with active prop as true', () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: true }
    })
    expect(wrapper.get('[data-testid="FilterLink_All"]').classes()).toContain('selected')
  })

  test('renders with active prop as false', () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false }
    })
    expect(wrapper.get('[data-testid="FilterLink_All"]').classes()).not.toContain('selected')
  })

  test('emits select event with "all" when clicked', async () => {
    const wrapper = mount(FilterLink_All)
    await wrapper.get('[data-testid="FilterLink_All"]').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual(['all'])
  })

  test('prevents default behavior on click', async () => {
    const wrapper = mount(FilterLink_All)
    const clickEvent = await wrapper.get('[data-testid="FilterLink_All"]').trigger('click')
    expect(clickEvent.defaultPrevented).toBe(true)
  })
})