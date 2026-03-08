<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="['btn', disabled ? 'opacity-50 cursor-not-allowed' : '', $attrs.class]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  disabled: Boolean
});
</script>

<style scoped>
</style>
