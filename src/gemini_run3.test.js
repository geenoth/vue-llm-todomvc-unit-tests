import { mount } from '@vue/test-utils'
import FilterLinkCompleted from './11_FilterLink_Completed.vue'

describe('11_FilterLink_Completed.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(FilterLinkCompleted)
  })

  it('renders the component correctly', () => {
    const link = wrapper.find('[data-testid="FilterLink_Completed"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Completed')
  })

  it('does not have the "selected" class by default', () => {
    const link = wrapper.find('[data-testid="FilterLink_Completed"]')
    expect(link.classes()).not.toContain('selected')
  })

  it('does not have the "selected" class when the "active" prop is false', () => {
    const wrapperWithProp = mount(FilterLinkCompleted, {
      props: {
        active: false,
      },
    })
    const link = wrapperWithProp.find('[data-testid="FilterLink_Completed"]')
    expect(link.classes()).not.toContain('selected')
  })

  it('applies the "selected" class when the "active" prop is true', () => {
    const wrapperWithProp = mount(FilterLinkCompleted, {
      props: {
        active: true,
      },
    })
    const link = wrapperWithProp.find('[data-testid="FilterLink_Completed"]')
    expect(link.classes()).toContain('selected')
  })

  it('emits a "select" event with "completed" as payload when clicked', async () => {
    const link = wrapper.find('[data-testid="FilterLink_Completed"]')
    await link.trigger('click')

    // Check that the event was emitted
    expect(wrapper.emitted().select).toBeTruthy()

    // Check that one event was emitted
    expect(wrapper.emitted().select.length).toBe(1)

    // Check the payload of the emitted event
    expect(wrapper.emitted().select[0]).toEqual(['completed'])
  })
})