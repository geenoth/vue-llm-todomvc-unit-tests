import { mount } from '@vue/test-utils';
import AddTodoInput from './01_AddTodoInput.vue';

describe('AddTodoInput', () => {
  // Test 1: Component renders correctly with default props
  it('renders the input element with the default placeholder', () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    
    // Check if the input element exists
    expect(input.exists()).toBe(true);
    
    // Check for the default placeholder text
    expect(input.attributes('placeholder')).toBe('What needs to be done?');
  });

  // Test 2: Component renders correctly with a custom placeholder prop
  it('renders the input element with a custom placeholder', () => {
    const customPlaceholder = 'Add a new task';
    const wrapper = mount(AddTodoInput, {
      props: {
        placeholder: customPlaceholder,
      },
    });
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    
    // Check if the custom placeholder is applied
    expect(input.attributes('placeholder')).toBe(customPlaceholder);
  });

  // Test 3: Updates its internal state when the user types
  it('updates the value on user input', async () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    
    // Simulate user typing
    await input.setValue('New todo item');
    
    // Check if the input's value in the DOM is updated
    expect(input.element.value).toBe('New todo item');
  });

  // Test 4: Emits 'add' event and clears the input when Enter is pressed with valid text
  it('emits an "add" event with the trimmed value and clears input on Enter', async () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    const todoText = '  Finish the test ';
    
    // Set the input value
    await input.setValue(todoText);
    
    // Trigger the Enter keydown event
    await input.trigger('keydown.enter');
    
    // Check if the 'add' event was emitted
    expect(wrapper.emitted()).toHaveProperty('add');
    
    // Check if the emitted event has the correct, trimmed payload
    expect(wrapper.emitted('add')[0]).toEqual(['Finish the test']);
    
    // Check if the input value was cleared after emitting
    expect(input.element.value).toBe('');
  });

  // Test 5: Does not emit 'add' event if the input is empty
  it('does not emit an "add" event if the input is empty on Enter', async () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    
    // Ensure the input is empty
    await input.setValue('');
    
    // Trigger the Enter keydown event
    await input.trigger('keydown.enter');
    
    // Check that the 'add' event was not emitted
    expect(wrapper.emitted()).not.toHaveProperty('add');
  });

  // Test 6: Does not emit 'add' event if the input contains only whitespace
  it('does not emit an "add" event if the input contains only whitespace on Enter', async () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');
    
    // Set value to only whitespace
    await input.setValue('   ');
    
    // Trigger the Enter keydown event
    await input.trigger('keydown.enter');
    
    // Check that the 'add' event was not emitted
    expect(wrapper.emitted()).not.toHaveProperty('add');
    
    // The input value should remain as it is, since no emit happened
    expect(input.element.value).toBe('   ');
  });
  
  // Test 7: Does not emit 'add' event for other key presses
  it('does not emit an "add" event on other key presses', async () => {
    const wrapper = mount(AddTodoInput);
    const input = wrapper.find('[data-testid="AddTodoInput"]');

    await input.setValue('Some text');
    
    // Trigger another keydown event
    await input.trigger('keydown.space');

    // Check that the 'add' event was not emitted
    expect(wrapper.emitted()).not.toHaveProperty('add');
  });
});