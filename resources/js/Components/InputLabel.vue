<template>
  <label :class="['label text-sm font-medium', $attrs.class]" v-bind="$attrs">
    <span class="label-text !text-black dark:!text-white">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  value: String
});
</script>

<style scoped>
</style>
