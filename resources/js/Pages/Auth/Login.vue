<template>
  <Head title="Log in" />
  <div class="login-bg">
    <div
      v-if="status"
      class="toast toast-top toast-end z-50"
    >
      <div class="alert alert-success" role="alert">
        <span>{{ status }}</span>
      </div>
    </div>

    <div class="login-hero-shell">
      <header class="login-hero-nav">
        <div class="login-hero-nav-left">
          <img :src="logoUrl" alt="sTracker preview" class="login-hero-logo shadow-md" />
          <span class="login-hero-brand font-bold text-lg">sTracker</span>
        </div>
        <div class="login-hero-nav-actions">
          <button
            type="button"
            class="login-hero-link login-hero-link-muted btn btn-ghost btn-sm normal-case"
            @click="openLoginModal"
          >
            Log in
          </button>
          <Link :href="route('register')" class="login-hero-cta btn btn-outline btn-sm normal-case">Get Started</Link>
        </div>
      </header>

      <main class="login-hero-main">
        <section class="login-hero-grid">
          <div class="login-hero-copy">
            <h1 class="login-hero-title"> 
              <span class="login-hero-title-highlight" style="background: linear-gradient(90deg, #7c3aed, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Strike your Goals!</span>
            </h1>
            <p class="login-hero-subcopy">
              sTracker turns everyday income and expenses into clear, simple insights so you
              can budget with confidence, avoid surprises, and stay on top of your goals.
            </p>
            <div class="login-hero-cta-row">
              <Link :href="route('register')" class="login-hero-primary-cta btn btn-primary btn-lg normal-case">Start tracking for free</Link>
            </div>
          </div>

          <div class="login-hero-card-wrapper flex flex-col gap-6">
            <div class="login-hero-preview">
              <div class="login-hero-preview-inner">
                <div class="login-inspiration-dashboard-frame">
                  <img
                    :src="previewUrl"
                    alt="sTracker preview"
                    class="login-inspiration-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      <div></div>
        <div></div>
        <div></div>
        <section class="mt-10 px-3">
          <div class="grid gap-4 md:grid-cols-3">
            <div class="card bg-base-100 shadow-sm border border-base-1600 bg-gray-300">
              <div class="card-body py-4 px-5">
                <h3 class="card-title text-sm font-semibold mb-1 text-base-content ">Secure & private</h3>
                <p class="text-xs text-base-content/90">Your data is encrypted in transit and stored safely so only you can see your numbers.</p>
              </div>
            </div>
        <div class="card bg-base-100 shadow-sm border border-base-1600 bg-gray-300">
              <div class="card-body py-4 px-5">
                <h3 class="card-title text-sm font-semibold mb-1 text-base-content">Works across devices</h3>
                <p class="text-xs text-base-content/90">Log in from desktop or mobile and pick up exactly where you left off.</p>
              </div>
            </div>
        <div class="card bg-base-100 shadow-sm border border-base-1600 bg-gray-300">
              <div class="card-body py-4 px-5">
                <h3 class="card-title text-sm font-semibold mb-1 text-base-content">Export when you need</h3>
                <p class="text-xs text-base-content/90">Download your transactions for sharing with your accountant or for backup.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <div
        v-if="showLoginModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
        @click.self="closeLoginModal"
      >
        <div class="relative w-full max-w-md">
          <div class="bg-white rounded-3xl shadow-2xl px-10 py-10 relative">
            <button
              type="button"
              class="btn btn-circle btn-sm btn-error text-white absolute -right-3 -top-3 shadow-lg"
              @click="closeLoginModal"
              aria-label="Close login"
            >
              ✕
            </button>

            <!-- Brand -->
            <div class="flex items-center gap-2 mb-8">
              <img :src="logoUrl" alt="sTracker Logo" class="h-6 w-6 rounded-md" />
              <span class="text-sm font-semibold text-gray-700">sTracker</span>
            </div>

            <!-- Heading -->
            <h2 class="text-4xl font-extrabold text-gray-900 leading-tight mb-1">Holla,<br />Welcome Back</h2>
            <p class="text-sm text-gray-400 mb-8">Hey, welcome back to your special place</p>

            <form @submit.prevent="submit" class="space-y-4">
              <!-- Email -->
              <TextInput
                id="email"
                type="email"
                name="email"
                v-model="form.email"
                autocomplete="username"
                :isFocused="true"
                placeholder="Email address"
                class="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primaryPurple focus:ring-0"
                required
              />
              <InputError :message="form.errors.email" class="-mt-2" />

              <!-- Password -->
              <TextInput
                id="password"
                type="password"
                name="password"
                v-model="form.password"
                autocomplete="current-password"
                placeholder="Password"
                class="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primaryPurple focus:ring-0"
                required
              />
              <InputError :message="form.errors.password" class="-mt-2" />

              <!-- Remember + Forgot -->
              <div class="flex items-center justify-between pt-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <Checkbox id="remember" name="remember" v-model="form.remember" class="checkbox checkbox-primary checkbox-sm" />
                  <span class="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  v-if="canResetPassword"
                  :href="route('password.request')"
                  class="text-sm text-primaryPurple hover:underline font-medium"
                >Forgot Password?</Link>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full mt-2 py-3 rounded-xl font-bold text-white text-base tracking-wide transition-all"
                style="background: #7c3aed;"
                :disabled="form.processing"
              >
                {{ form.processing ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <!-- Sign up link -->
            <p class="mt-8 text-sm text-gray-400 text-center">
              Don't have an account?
              <Link :href="route('register')" class="text-primaryPurple font-semibold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div></div>
        <div></div>
        <div></div>
        <div></div>
      <footer class="mt-12 bg-transparent text-black">
        <div class="max-w-6xl mx-auto px-6 py-10 md:py-12">
          <div class="grid gap-10 md:grid-cols-4">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="avatar placeholder">

                </div>
                <div>
                  <div class="text-sm font-semibold tracking-wide uppercase text-black">Rocky Penamante</div>
                  <p class="text-xs text-black/70">Tech Enthusiast</p>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-black">Contact</h3>
              <ul class="space-y-1 text-xs text-black/80">
                <li>Eastwood Residence</li>
                <li>Rodriguez, Philippines</li>
                <li><span class="link link-hover">Get in touch</span></li>
              </ul>
            </div>



            <div class="space-y-4">
              <div>
                <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-2">Services</h3>
                <ul class="space-y-1 text-xs text-black/80">
                  <li>Web Development</li>
                  <li>Project Management</li>
                </ul>
              </div>

              <div>
                <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-2">Follow</h3>
                <div class="flex items-center gap-2">
                  <button type="button" class="btn btn-xs btn-circle btn-ghost border border-neutral-300 text-black">in</button>
                  <button type="button" class="btn btn-xs btn-circle btn-ghost border border-neutral-300 text-black">X</button>
                  <button type="button" class="btn btn-xs btn-circle btn-ghost border border-neutral-300 text-black">GH</button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-neutral-200 flex flex-col gap-2 text-[11px] text-black/70 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Rocky Penamante. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logoUrl from '@/../../public/images/stracker-logo.png';
import previewUrl from '@/../../public/images/frontview2.png';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
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

const showLoginModal = ref(true);

function openLoginModal() {
  showLoginModal.value = true;
}

function closeLoginModal() {
  showLoginModal.value = false;
}

function submit() {
  form.post('/login', {
    onFinish: () => form.reset('password'),
  });
}
</script>

<style scoped>
@import '../../../css/login.css';
</style>
