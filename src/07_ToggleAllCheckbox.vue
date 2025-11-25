<template>
  <input
    data-testid="ToggleAllCheckbox"
    type="checkbox"
    :checked="allChecked"
    @change="onToggleAll"
  />
</template>

<script setup>
const props = defineProps({ allChecked: { type: Boolean, default: false } })
const emit = defineEmits(['toggleAll'])
function onToggleAll(e) { emit('toggleAll', e.target.checked) }
</script>
