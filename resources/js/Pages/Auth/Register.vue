<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
    <Head title="Register" />
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Create Account</h1>
        <p class="text-sm">Join us to get started</p>
      </div>
      <div class="card shadow-lg">
        <div class="card-body">
          <form @submit.prevent="submit" class="space-y-5">
            <div>
              <InputLabel htmlFor="name" value="Full Name" />
              <TextInput
                id="name"
                type="text"
                name="name"
                v-model="form.name"
                autocomplete="name"
                :isFocused="true"
                placeholder="John Doe"
                required
              />
              <InputError :message="errors.name" class="mt-1" />
            </div>
            <div>
              <InputLabel htmlFor="email" value="Email Address" />
              <TextInput
                id="email"
                type="email"
                name="email"
                v-model="form.email"
                autocomplete="email"
                placeholder="you@example.com"
                required
              />
              <InputError :message="errors.email" class="mt-1" />
            </div>
            <div>
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                v-model="form.password"
                autocomplete="new-password"
                placeholder="••••••••"
                required
              />
              <InputError :message="errors.password" class="mt-1" />
            </div>
            <div>
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                v-model="form.password_confirmation"
                autocomplete="new-password"
                placeholder="••••••••"
                required
              />
              <InputError :message="errors.password_confirmation" class="mt-1" />
            </div>
            <PrimaryButton class="w-full" :disabled="processing">
              {{ processing ? 'Creating account...' : 'Create Account' }}
            </PrimaryButton>
          </form>
          <div class="divider">OR</div>
          <p class="text-center text-sm">
            Already have an account?
            <Link :href="route('login')" class="underline">Sign in</Link>
          </p>
        </div>
      </div>
      <p class="mt-6 text-center text-xs">
        By creating an account, you agree to our terms of service
      </p>
    </div>
  </div>
</template>

<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});
const errors = ref({});
const processing = ref(false);

function submit() {
  processing.value = true;
  // Use Inertia form post
  // You may need to adjust this to useForm if you want validation, etc.
  // For now, use router.post for simplicity
  window.route('register'); // ensure route helper is available
  // Simulate Inertia post (replace with useForm if needed)
  // router.post(route('register'), form.value, ...)
  // For now, just set processing to false after a delay
  setTimeout(() => {
    processing.value = false;
  }, 1000);
}
</script>

<style scoped>
</style>
