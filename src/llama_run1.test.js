import { shallowMount } from '@vue/test-utils'
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo 1' },
    })

    expect(wrapper.find('[data-testid="TodoLabel"]').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Todo 1')
  })

  it('emits "edit" event on double click', async () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo 1' },
    })

    const label = wrapper.find('[data-testid="TodoLabel"]')
    await label.trigger('dblclick')

    expect(wrapper.emitted('edit')).toBeDefined()
  })

  it('updates title prop when changed', async () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo 1' },
    })

    await wrapper.setProps({ title: 'Todo 2' })

    expect(wrapper.find('span').text()).toBe('Todo 2')
  })
})