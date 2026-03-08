<template>
  <div class="min-h-screen bg-base-200 text-base-content dark:bg-base-300 dark:text-base-100">
    <nav class="navbar bg-base-100 dark:bg-base-200">
      <div class="flex-1">
        <Link href="/" class="btn btn-ghost normal-case text-xl">
          <ApplicationLogo class="h-9 w-auto" />
        </Link>
      </div>
      <div class="flex-none hidden sm:flex items-center">
        <ThemeToggle />
        <NavLink
          :href="route('dashboard')"
          class="btn btn-ghost ml-2"
        >
          Dashboard
        </NavLink>
        <Dropdown>
          <DropdownTrigger>
            <button class="btn btn-ghost ml-2">
              {{ user.name }}
              <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownLink :href="route('profile.edit')">Profile</DropdownLink>
            <DropdownLink :href="route('logout')" method="post" as="button">Log Out</DropdownLink>
          </DropdownContent>
        </Dropdown>
      </div>
      <div class="flex-none sm:hidden">
        <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="btn btn-square btn-ghost">
          <svg v-if="showingNavigationDropdown" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div v-if="showingNavigationDropdown" class="menu menu-vertical p-2 bg-base-100">
        <ThemeToggle />
        <Link :href="route('dashboard')" class="btn btn-ghost">Dashboard</Link>
        <Link :href="route('profile.edit')" class="btn btn-ghost">Profile</Link>
        <Link :href="route('logout')" method="post" as="button" class="btn btn-ghost">Log Out</Link>
      </div>
    </nav>
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
