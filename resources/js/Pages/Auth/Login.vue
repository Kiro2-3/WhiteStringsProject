<template>
  <Head title="Log in" />
  <div class="login-bg">
    <div class="login-hero-shell">
      <header class="login-hero-nav">
        <div class="login-hero-nav-left">
          <img :src="logoUrl" alt="sTracker preview" class="login-hero-logo" />
          <span class="login-hero-brand">sTracker</span>
        </div>
        <nav class="login-hero-nav-links" aria-label="Primary">
        </nav>
        <div class="login-hero-nav-actions">
          <span class="login-hero-link login-hero-link-muted">Log in</span>
          <Link :href="route('register')" class="login-hero-cta">Get Started</Link>
        </div>
      </header>

      <main class="login-hero-main">
        <section class="login-hero-grid">
          <div class="login-hero-copy">
            <div class="login-hero-badge">

            </div>
            <h1 class="login-hero-title">
              <span>Take Control of Your</span>
              <span class="login-hero-title-highlight">Financial Future</span>
            </h1>
            <p class="login-hero-subcopy">
              The simple, intuitive way to track your income, manage expenses, and
              visualise your financial growth. sTracker helps you master your money.
            </p>
            <div class="login-hero-cta-row">
              <Link :href="route('register')" class="login-hero-primary-cta">Start tracking for free</Link>
              <button type="button" class="login-hero-secondary-cta">Learn more</button>
            </div>
          </div>

          <div class="login-hero-card-wrapper">
            <div class="login-inspiration-card">
              <div v-if="status" class="login-inspiration-status">
                {{ status }}
              </div>
              <form @submit.prevent="submit" class="login-inspiration-form-fields">
                <div class="login-inspiration-inputs">
                  <div>
                    <InputLabel htmlFor="email" value="Email Address" class="login-label" />
                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      v-model="form.email"
                      autocomplete="username"
                      :isFocused="true"
                      placeholder="Email"
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
                      placeholder="Password"
                      class="login-input"
                      required
                    />
                    <InputError :message="form.errors.password" class="mt-1" />
                  </div>
                </div>
                <div class="login-inspiration-actions">
                  <div class="login-checkbox-row login-inspiration-checkbox-row">
                    <Checkbox
                      id="remember"
                      name="remember"
                      v-model="form.remember"
                    />
                    <label for="remember" class="login-checkbox-label">
                      Keep me logged in
                    </label>
                    <Link v-if="canResetPassword" :href="route('password.request')" class="login-inspiration-forgot">Forgot password?</Link>
                  </div>
                  <PrimaryButton class="login-btn login-inspiration-btn" :disabled="form.processing">
                    {{ form.processing ? 'Signing in...' : 'Log In' }}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section class="login-hero-preview">
          <div class="login-hero-preview-inner">
            <div class="login-inspiration-dashboard-frame">
              <img
                :src="previewUrl"
                alt="sTracker preview"
                class="login-inspiration-preview-img"
              />
            </div>
          </div>
        </section>
      </main>

      <footer class="login-hero-footer">© 2026 sTracker.</footer>
    </div>
  </div>
</template>

<script setup>
import logoUrl from '@/../../public/images/stracker-logo.png';
import previewUrl from '@/../../public/images/preview.png';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

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
  form.post('/login', {
    onFinish: () => form.reset('password'),
  });
}
</script>

<style scoped>
@import '../../../css/login.css';
</style>
