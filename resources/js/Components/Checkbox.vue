<template>
  <input
    v-bind="$attrs"
    type="checkbox"
    :class="['checkbox', $attrs.class]"
  />
</template>

<script setup>
// No script needed, all props/attrs passed through
</script>

<style scoped>
</style>
