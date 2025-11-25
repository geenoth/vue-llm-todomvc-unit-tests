<template>
  <span data-testid="TodoLabel" @dblclick="onEdit">{{ title }}</span>
</template>

<script setup>
const props = defineProps({ title: { type: String, default: '' } })
const emit = defineEmits(['edit'])
function onEdit() { emit('edit') }
</script>
