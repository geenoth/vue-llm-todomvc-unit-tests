import { mount } from '@vue/test-utils';
import TodoLabel from './08_TodoLabel.vue';

describe('TodoLabel Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoLabel, {
      props: {
        title: 'Test Todo'
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders the title correctly', () => {
    expect(wrapper.get('[data-testid="TodoLabel"]').text()).toBe('Test Todo');
  });

  test('emits edit event on double click', async () => {
    await wrapper.get('[data-testid="TodoLabel"]').trigger('dblclick');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit').length).toBe(1);
  });

  test('renders updated title when props change', async () => {
    await wrapper.setProps({ title: 'Updated Todo' });
    expect(wrapper.get('[data-testid="TodoLabel"]').text()).toBe('Updated Todo');
  });

  test('renders empty string as title when no title prop is provided', () => {
    wrapper = mount(TodoLabel);
    expect(wrapper.get('[data-testid="TodoLabel"]').text()).toBe('');
  });
});