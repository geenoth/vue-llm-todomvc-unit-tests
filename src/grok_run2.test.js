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
    const label = wrapper.get('[data-testid="TodoLabel"]');
    expect(label.text()).toBe('Test Todo');
  });

  test('emits edit event on double click', async () => {
    const label = wrapper.get('[data-testid="TodoLabel"]');
    await label.trigger('dblclick');
    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit').length).toBe(1);
  });

  test('renders updated title when props change', async () => {
    await wrapper.setProps({ title: 'Updated Todo' });
    const label = wrapper.get('[data-testid="TodoLabel"]');
    expect(label.text()).toBe('Updated Todo');
  });

  test('renders empty string when title prop is not provided', () => {
    wrapper = mount(TodoLabel, {
      props: {
        title: ''
      }
    });
    const label = wrapper.get('[data-testid="TodoLabel"]');
    expect(label.text()).toBe('');
  });
});