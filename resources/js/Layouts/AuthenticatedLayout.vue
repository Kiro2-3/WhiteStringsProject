<template>
  <div class="min-h-screen bg-base-200 text-base-content dark:bg-base-300 dark:text-base-100">
    <header v-if="header" class="bg-base-100 dark:bg-base-200 shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot name="header">{{ header }}</slot>
      </div>
    </header>
    <main><slot /></main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import ThemeToggle from '@/Components/ThemeToggle.vue';
// DropdownTrigger, DropdownContent, DropdownLink are subcomponents of Dropdown.vue
import DropdownTrigger from '@/Components/Dropdown.vue';
import DropdownContent from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

const props = defineProps({
  header: String
});
const user = computed(() => usePage().props.auth.user);
const showingNavigationDropdown = ref(false);
</script>

<style scoped>
</style>
