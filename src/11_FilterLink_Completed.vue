<template>
  <a
    href="#"
    data-testid="FilterLink_Completed"
    :class="{ selected: active }"
    @click.prevent="select"
  >
    Completed
  </a>
</template>

<script setup>
const props = defineProps({ active: { type: Boolean, default: false } })
const emit = defineEmits(['select'])
function select() { emit('select', 'completed') }
</script>
