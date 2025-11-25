<template>
  <button
    data-testid="ClearCompletedButton"
    type="button"
    :disabled="!hasCompleted"
    @click="onClear"
  >
    Clear completed
  </button>
</template>

<script setup>
const props = defineProps({ hasCompleted: { type: Boolean, default: false } })
const emit = defineEmits(['clear'])
function onClear() { if (props.hasCompleted) emit('clear') }
</script>
