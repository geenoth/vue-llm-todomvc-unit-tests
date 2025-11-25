<template>
  <input
    data-testid="TodoItemCheckbox"
    type="checkbox"
    :checked="checked"
    @change="onChange"
  />
</template>

<script setup>
const props = defineProps({ checked: { type: Boolean, default: false } })
const emit = defineEmits(['change'])
function onChange(e) { emit('change', e.target.checked) }
</script>
