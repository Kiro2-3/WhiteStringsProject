<template>
  <button
    v-bind="$attrs"
    :class="['btn btn-primary', disabled ? 'opacity-50 cursor-not-allowed' : '', $attrs.class]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean
});
</script>

<style scoped>
</style>
