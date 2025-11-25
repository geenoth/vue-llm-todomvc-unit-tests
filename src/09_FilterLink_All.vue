<template>
  <a
    href="#"
    data-testid="FilterLink_All"
    :class="{ selected: active }"
    @click.prevent="select"
  >
    All
  </a>
</template>

<script setup>
const props = defineProps({ active: { type: Boolean, default: false } })
const emit = defineEmits(['select'])
function select() { emit('select', 'all') }
</script>
