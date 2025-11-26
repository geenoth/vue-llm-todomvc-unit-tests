import { mount } from '@vue/test-utils';
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel', () => {
  test('renders the title prop correctly', () => {
    const title = 'Test Todo';
    const wrapper = mount(TodoLabel, {
      props: { title }
    });
    expect(wrapper.get('[data-testid="TodoLabel"]').text()).toBe(title);
  });

  test('emits edit event on double click', async () => {
    const wrapper = mount(TodoLabel, {
      props: { title: 'Test Todo' }
    });
    await wrapper.get('[data-testid="TodoLabel"]').trigger('dblclick');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit').length).toBe(1);
  });

  test('renders empty string when title prop is not provided', () => {
    const wrapper = mount(TodoLabel);
    expect(wrapper.get('[data-testid="TodoLabel"]').text()).toBe('');
  });
});