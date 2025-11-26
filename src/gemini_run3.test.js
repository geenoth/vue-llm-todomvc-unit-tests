import { mount } from '@vue/test-utils';
import TodoLabel from './08_TodoLabel.vue';

/**
 * @jest-environment jsdom
 */

describe('08_TodoLabel', () => {
  // Test 1: Correct rendering with a given title
  it('should render the title prop correctly', () => {
    const title = 'My Test Todo';
    const wrapper = mount(TodoLabel, {
      props: {
        title,
      },
    });

    // Find the element using the data-testid
    const label = wrapper.find('[data-testid="TodoLabel"]');
    
    // Assert that the element exists
    expect(label.exists()).toBe(true);
    
    // Assert that the text content matches the prop
    expect(label.text()).toBe(title);
  });

  // Test 2: Rendering with default (empty) title
  it('should render an empty span if no title prop is provided', () => {
    const wrapper = mount(TodoLabel);
    const label = wrapper.find('[data-testid="TodoLabel"]');
    
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('');
  });

  // Test 3: User interaction - double-click
  it('should emit an "edit" event on double-click', async () => {
    const wrapper = mount(TodoLabel, {
      props: { title: 'Double click me' },
    });

    const label = wrapper.find('[data-testid="TodoLabel"]');
    
    // Trigger the double-click event
    await label.trigger('dblclick');

    // Assert that the 'edit' event was emitted
    expect(wrapper.emitted()).toHaveProperty('edit');
    
    // Assert that it was emitted exactly once
    expect(wrapper.emitted('edit')).toHaveLength(1);
  });

  // Test 4: Prop updates
  it('should update the displayed text when the title prop changes', async () => {
    const wrapper = mount(TodoLabel, {
      props: {
        title: 'Initial Title',
      },
    });

    // Check initial render
    expect(wrapper.text()).toBe('Initial Title');

    const newTitle = 'Updated Title';
    
    // Update the props
    await wrapper.setProps({ title: newTitle });

    // Assert that the text content has updated
    expect(wrapper.text()).toBe(newTitle);
  });
});