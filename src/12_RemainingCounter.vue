<template>
  <div data-testid="RemainingCounter">
    <strong>{{ count }}</strong>
    <span> {{ count === 1 ? 'item' : 'items' }} left</span>
  </div>
</template>

<script setup>
const props = defineProps({ count: { type: Number, default: 0 } })
</script>
