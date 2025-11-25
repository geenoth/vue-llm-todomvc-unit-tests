<template>
  <button data-testid="DestroyButton" type="button" @click="onClick" aria-label="Delete">
    ×
  </button>
</template>

<script setup>
const emit = defineEmits(['destroy'])
function onClick() { emit('destroy') }
</script>
