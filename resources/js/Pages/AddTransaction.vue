<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center bg-base-100 dark:bg-gray-900 px-4 py-12">
    <div class="w-full max-w-2xl card bg-white dark:bg-gray-800 shadow-xl p-10">
      <div class="mb-8 flex items-center justify-between">
        <button
          type="button"
          class="btn btn-outline btn-lg"
          @click="goToDashboard"
        >
          ← Back to Dashboard
        </button>
        <h2 class="font-bold text-3xl text-blue-600 dark:text-blue-300 text-right">Add Transaction</h2>
      </div>
      <form @submit.prevent="submit" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="form-control">
            <InputLabel value="Description" htmlFor="description" />
            <TextInput
              id="description"
              type="text"
              placeholder="Description"
              v-model="form.description"
            />
            <InputError v-if="errors.description" :message="errors.description" />
          </div>
          <div class="form-control">
            <InputLabel value="Amount" htmlFor="amount" />
            <TextInput
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              v-model="form.amount"
            />
            <InputError v-if="errors.amount" :message="errors.amount" />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="form-control">
            <InputLabel value="Type" htmlFor="type" />
            <select
              id="type"
              class="select select-bordered w-full text-black bg-white"
              v-model="form.type"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <InputError v-if="errors.type" :message="errors.type" />
          </div>
          <div class="form-control">
            <InputLabel value="Category" htmlFor="category" />
            <select
              id="category"
              class="select select-bordered w-full text-black bg-white"
              :class="form.type === 'income' ? 'opacity-50 cursor-not-allowed' : ''"
              v-model="form.category"
              :disabled="form.type === 'income'"
            >
              <option v-if="form.type === 'income'" value="Salary">Salary</option>
              <template v-else>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </template>
            </select>
            <InputError v-if="errors.category" :message="errors.category" />
          </div>
        </div>
        <div class="form-control max-w-xs">
          <InputLabel value="Date" htmlFor="entry_date" />
          <input
            id="entry_date"
            type="date"
            class="input input-bordered w-full text-black bg-white"
            v-model="form.entry_date"
          />
          <InputError v-if="errors.entry_date" :message="errors.entry_date" />
        </div>
        <div class="flex justify-end">
          <PrimaryButton
            type="submit"
            class="w-full md:w-1/3 text-lg"
            :disabled="processing"
          >
            Save Transaction
          </PrimaryButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => ["Food", "Rent", "Leisure", "Bills"]
  }
});

const form = ref({
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  entry_date: new Date().toISOString().split('T')[0],
});
const errors = ref({});
const processing = ref(false);

watch(() => form.value.type, (newType) => {
  if (newType === 'income') {
    form.value.category = 'Salary';
  } else if (newType === 'expense' && form.value.category === 'Salary') {
    form.value.category = 'Food';
  }
});

function submit() {
  processing.value = true;
  router.post(route('transactions.store'), form.value, {
    onSuccess: () => {
      form.value = {
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        entry_date: new Date().toISOString().split('T')[0],
      };
      errors.value = {};
      processing.value = false;
    },
    onError: (e) => {
      errors.value = e;
      processing.value = false;
    }
  });
}
function goToDashboard() {
  router.visit(route('dashboard'));
}
</script>

<style scoped>
</style>
