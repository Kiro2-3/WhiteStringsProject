<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-base-200 pt-6">
    <div>
      <Link href="/">
        <ApplicationLogo class="h-20 w-20 fill-current text-gray-700 dark:text-gray-400" />
      </Link>
    </div>
    <div class="mt-6 w-full max-w-md card bg-base-100 shadow-xl">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
</script>

<style scoped>
</style>
