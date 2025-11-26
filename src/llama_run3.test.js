import { shallowMount } from '@vue/test-utils'
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo title' }
    })
    expect(wrapper.find('[data-testid="TodoLabel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('Todo title')
  })

  it('emits "edit" event on double click', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo title' }
    })
    wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
    expect(wrapper.emitted('edit')).toHaveLength(1)
  })

  it('displays prop title correctly', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'New title' }
    })
    expect(wrapper.find('[data-testid="TodoLabel"]').text()).toBe('New title')
  })
})