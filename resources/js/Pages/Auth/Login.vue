<template>
  <Head title="Log in" />
  <div class="login-bg">
    <LoginQuoteInfiniteSkewed30Down />
    <div class="login-container">
      <div class="login-header">
        <img :src="logoUrl" alt="sTracker Logo" style="width:180px; height:auto; margin:0 auto 1.5rem auto; display:block;" />
        <div class="login-title">Welcome Back</div>
        <div class="login-subtitle">Sign in to your account</div>
      </div>
      <div class="login-card">
        <div v-if="status" class="alert alert-success mb-4">
          <span>{{ status }}</span>
        </div>
        <form @submit.prevent="submit" class="login-form">
          <div>
            <InputLabel htmlFor="email" value="Email Address" class="login-label" />
            <TextInput
              id="email"
              type="email"
              name="email"
              v-model="form.email"
              autocomplete="username"
              :isFocused="true"
              placeholder="you@example.com"
              class="login-input"
              required
            />
            <InputError :message="form.errors.email" class="mt-1" />
          </div>
          <div>
            <InputLabel htmlFor="password" value="Password" class="login-label" />
            <TextInput
              id="password"
              type="password"
              name="password"
              v-model="form.password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="login-input"
              required
            />
            <InputError :message="form.errors.password" class="mt-1" />
          </div>
          <div class="login-checkbox-row">
            <Checkbox
              id="remember"
              name="remember"
              v-model="form.remember"
            />
            <label for="remember" class="login-checkbox-label">
              Keep me logged in
            </label>
          </div>
          <PrimaryButton class="login-btn" :disabled="form.processing">
            {{ form.processing ? 'Signing in...' : 'Sign In' }}
          </PrimaryButton>
        </form>
        <div class="login-divider">OR</div>
        <div class="login-links">
          <Link v-if="canResetPassword" :href="route('password.request')" class="login-link">
            Forgot password?
          </Link>
          <span>·</span>
          <Link :href="route('register')" class="login-link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logoUrl from '@/../../public/images/stracker-logo.png';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import LoginQuoteInfiniteSkewed30Down from './LoginQuoteInfiniteSkewed30Down.vue';

const props = defineProps({
  status: String,
  canResetPassword: Boolean
});

const form = useForm({
  email: '',
  password: '',
  remember: false
});

function submit() {
  // Log plain form data for debugging
  console.log('Submitting login form data:', { email: form.email, password: form.password, remember: form.remember });
  // Use explicit POST and URL to avoid route helper issues
  form.post('/login', {
    onFinish: () => form.reset('password'),
  });
}
</script>

<style scoped>
@import '../../../css/login.css';
</style>
