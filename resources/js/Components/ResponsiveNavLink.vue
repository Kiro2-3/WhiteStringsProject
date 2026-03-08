<template>
  <Link
    v-bind="$attrs"
    :class="['btn btn-ghost w-full justify-start', active ? 'btn-active' : '', $attrs.class]"
  >
    <slot />
  </Link>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
defineProps({
  active: Boolean
});
</script>

<style scoped>
</style>
