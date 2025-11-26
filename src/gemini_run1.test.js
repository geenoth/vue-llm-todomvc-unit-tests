import { mount } from '@vue/test-utils'
import ClearCompletedButton from './04_ClearCompletedButton.vue'

describe('ClearCompletedButton', () => {
  let wrapper

  const createComponent = (props = {}) => {
    wrapper = mount(ClearCompletedButton, { props })
  }

  it('should render the button correctly', () => {
    createComponent()
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Clear completed')
  })

  it('should be disabled when hasCompleted is false', () => {
    createComponent({ hasCompleted: false })
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should be enabled when hasCompleted is true', () => {
    createComponent({ hasCompleted: true })
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('should not emit "clear" event when clicked and disabled', async () => {
    createComponent({ hasCompleted: false })
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    
    await button.trigger('click')
    
    expect(wrapper.emitted('clear')).toBeUndefined()
  })

  it('should emit "clear" event when clicked and enabled', async () => {
    createComponent({ hasCompleted: true })
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    
    await button.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('should update its disabled state when hasCompleted prop changes', async () => {
    createComponent({ hasCompleted: false })
    const button = wrapper.find('[data-testid="ClearCompletedButton"]')
    
    expect(button.attributes('disabled')).toBeDefined()
    
    await wrapper.setProps({ hasCompleted: true })
    
    expect(button.attributes('disabled')).toBeUndefined()
  })
})