<template>
  <input
    data-testid="EditTodoInput"
    class="edit-todo-input"
    v-model="text"
    :placeholder="placeholder"
    @keydown.enter="onSave"
    @keydown.esc="onCancel"
    @blur="onSave"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Edit todo' }
})
const emit = defineEmits(['update:modelValue', 'save', 'cancel'])
const text = ref(props.modelValue)
watch(() => props.modelValue, v => { text.value = v })
function onSave() {
  const value = (text.value || '').trim()
  emit('save', value)
  emit('update:modelValue', value)
}
function onCancel() {
  emit('cancel')
}
</script>
