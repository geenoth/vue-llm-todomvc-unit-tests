<template>
  <a
    href="#"
    data-testid="FilterLink_Active"
    :class="{ selected: active }"
    @click.prevent="select"
  >
    Active
  </a>
</template>

<script setup>
const props = defineProps({ active: { type: Boolean, default: false } })
const emit = defineEmits(['select'])
function select() { emit('select', 'active') }
</script>
