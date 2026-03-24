<template>
  <AuthenticatedLayout :user="auth.user">
    <Head title="Bank Accounts" />
    <div class="min-h-screen w-full flex flex-col md:flex-row bg-base-200 text-base-content">
      <AppSidebar :user="auth.user" active-page="bank-accounts" />
      <main class="flex-1 min-w-0 px-4 md:px-12 py-8">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <!-- Add Bank Account Form -->
          <div class="w-full md:w-1/2">
            <div class="card bg-base-100 border border-base-200 shadow-xl p-8 h-full">
              <h2 class="text-2xl font-bold mb-6">Add Bank Account</h2>
              <form @submit.prevent="submitBankAccount">
                <div class="mb-4">
                  <label class="form-control w-full gap-2">
                    <span class="label-text font-semibold text-base-content">Bank Name</span>
                    <input v-model="form.bank_name" type="text" class="input input-bordered w-full bg-base-100 text-base-content" required />
                  </label>
                </div>
                <div class="mb-4">
                  <label class="form-control w-full gap-2">
                    <span class="label-text font-semibold text-base-content">Account Number</span>
                    <input v-model="form.account_number" type="text" class="input input-bordered w-full bg-base-100 text-base-content" required />
                  </label>
                </div>
                <div class="mb-4">
                  <label class="form-control w-full gap-2">
                    <span class="label-text font-semibold text-base-content">Account Name</span>
                    <input v-model="form.account_name" type="text" class="input input-bordered w-full bg-base-100 text-base-content" required />
                  </label>
                </div>
                <div class="mb-4">
                  <label class="form-control w-full gap-2">
                    <span class="label-text font-semibold text-base-content">Bank Branch</span>
                    <input v-model="form.branch" type="text" class="input input-bordered w-full bg-base-100 text-base-content" />
                  </label>
                </div>
                <div class="mb-6">
                  <label class="form-control w-full gap-2">
                    <span class="label-text font-semibold text-base-content">Notes</span>
                    <textarea v-model="form.notes" class="textarea textarea-bordered w-full bg-base-100 text-base-content" rows="2"></textarea>
                  </label>
                </div>
                <button type="submit" class="btn btn-primary w-full">Save Bank Account</button>
              </form>
            </div>
          </div>

          <!-- Saved Bank Accounts Card -->
          <div class="w-full md:w-1/2 flex flex-col">
            <div v-if="props.bankAccounts && props.bankAccounts.length" class="card bg-base-100 border border-base-200 shadow p-6 h-full">
              <h3 class="text-xl font-semibold mb-4">Saved Bank Accounts</h3>
              <ul class="divide-y divide-base-200">
                <li v-for="account in props.bankAccounts" :key="account.id" class="py-3 cursor-pointer hover:bg-base-200 rounded transition"
                    @click="handleAccountClick(account)">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-base-content">{{ account.bank_name }}</span>
                      <span class="text-xs text-base-content/60">{{ account.branch }}</span>
                    </div>
                    <div class="text-sm text-base-content/80">Acct #: {{ account.account_number }}</div>
                    <div class="text-sm text-base-content/80">Name: {{ account.account_name }}</div>
                    <div v-if="account.notes" class="text-xs text-base-content/50 mt-1">{{ account.notes }}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="card bg-base-100 border border-base-200 shadow p-6 text-center text-base-content/60 h-full flex items-center justify-center">
              <span>No bank accounts saved yet.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import AppSidebar from '@/Components/AppSidebar.vue'

const props = defineProps({
  auth: Object,
  bankAccounts: Array,
})

const form = ref({
  bank_name: '',
  account_number: '',
  account_name: '',
  branch: '',
  notes: '',
})

function submitBankAccount() {
  router.post(route('bank-accounts.store'), form.value, {
    preserveScroll: true,
    onSuccess: () => {
      form.value = { bank_name: '', account_number: '', account_name: '', branch: '', notes: '' }
    },
  })
}

function handleAccountClick(account) {
  // For now, just show an alert. Replace with modal or navigation as needed.
  alert(`Bank: ${account.bank_name}\nAccount #: ${account.account_number}\nName: ${account.account_name}`)
}
</script>

<style scoped>
</style>
