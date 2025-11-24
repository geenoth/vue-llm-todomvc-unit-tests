<template>
  <input
    data-testid="AddTodoInput"
    class="add-todo-input"
    :placeholder="placeholder"
    v-model="text"
    @keydown.enter="onEnter"
  />
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  placeholder: { type: String, default: 'What needs to be done?' }
})
const emit = defineEmits(['add'])
const text = ref('')
function onEnter() {
  const value = text.value.trim()
  if (value) {
    emit('add', value)
    text.value = ''
  }
}
</script>
