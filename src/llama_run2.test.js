import { shallowMount } from '@vue/test-utils'
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel', () => {
  it('renders correctly with title', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo 1' },
    })
    expect(wrapper.find('[data-testid="TodoLabel"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Todo 1')
  })

  it('emits edit event on double click', () => {
    const wrapper = shallowMount(TodoLabel, {
      props: { title: 'Todo 1' },
    })
    const emitSpy = jest.spyOn(wrapper.emitted(), 'edit')
    wrapper.find('[data-testid="TodoLabel"]').trigger('dblclick')
    expect(emitSpy).toHaveBeenCalledTimes(1)
  })
})