<template>
  <div data-testid="TodoList">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          data-testid="TodoItemCheckbox"
          type="checkbox"
          :checked="todo.completed"
          @change="() => $emit('toggle', todo.id)"
        />
        <label data-testid="TodoLabel" @dblclick="$emit('edit', todo.id)">{{ todo.title }}</label>
        <button data-testid="DestroyButton" @click="$emit('destroy', todo.id)">×</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  todos: { type: Array, default: () => [] }
})
const emit = defineEmits(['toggle', 'destroy', 'edit'])
</script>
