<template>
  <AuthenticatedLayout :user="auth.user">
    <Head title="Categories" />

    <div class="min-h-screen w-full flex flex-col md:flex-row bg-base-200 text-base-content">
      <!-- Sidebar -->
      <aside
        class="w-full md:w-60 flex md:flex-col flex-row gap-2 md:gap-6 items-stretch min-h-[4rem] md:min-h-[32rem] justify-start bg-base-100 border-b md:border-b-0 md:border-r border-base-200 p-4 sticky top-0 z-20 shadow-sm"
      >
        <div class="flex items-center md:mb-8 mb-2">
          <img src="/public/images/stracker-logo.png" alt="Stracker Logo" class="h-25 w-auto mr-6" />

        </div>

        <button
          class="btn btn-sm md:btn-md justify-start gap-2 font-medium normal-case btn-ghost text-base-content"
          @click="router.get(route('dashboard'))"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.75 4.5h7.5v7.5h-7.5zM12.75 4.5h7.5v7.5h-7.5zM12.75 13.5h7.5v7.5h-7.5zM3.75 13.5h7.5v7.5h-7.5z" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button
          class="btn btn-sm md:btn-md justify-start gap-2 font-medium normal-case btn-neutral text-base-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 6h.008v.008H6V6z" />
          </svg>
          <span>Categories</span>
        </button>

        <button
          class="btn btn-sm md:btn-md justify-start gap-2 font-medium normal-case btn-ghost text-base-content"
          @click="router.get(route('transactions.recent'))"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6v6h4.5M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
          </svg>
          <span>Transactions</span>
        </button>

        <button
          class="btn btn-primary btn-sm md:btn-md justify-start gap-2 font-semibold shadow"
          @click="router.get(route('transactions.add'))"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Transaction</span>
        </button>

        <div class="mt-auto flex flex-col gap-2">
          <button
            class="btn btn-ghost btn-sm md:btn-md justify-start gap-2 font-medium normal-case text-base-content"
            @click="router.get(route('profile.edit'))"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Profile Settings</span>
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 px-4 md:px-12 py-8 w-full">
        <div class="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
          <!-- Header -->
          <div class="p-6 border-b border-base-200 flex items-center justify-between">
            <div>
              <h1 class="text-xl font-bold text-base-content">Categories</h1>
              <p class="text-sm text-base-content/60 mt-0.5">Manage the expense categories used in your transactions.</p>
            </div>
            <button
              class="btn btn-primary btn-sm gap-2"
              @click="openAddModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Category
            </button>
          </div>

          <!-- Flash success message -->
          <div v-if="flash.success" class="m-4 alert alert-success text-sm font-medium">
            {{ flash.success }}
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(cat, index) in localCategories"
                  :key="cat.id"
                >
                  <td class="text-base-content/50 text-sm">{{ index + 1 }}</td>
                  <td class="font-medium text-base-content">{{ cat.name }}</td>
                  <td class="text-right">
                    <template v-if="cat.name !== 'Salary'">
                      <button
                        class="btn btn-ghost btn-xs text-primary mr-1"
                        @click="openEditModal(cat)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        class="btn btn-ghost btn-xs text-error"
                        @click="confirmDelete(cat)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </template>
                    <span v-else class="text-xs text-base-content/40">Default</span>
                  </td>
                </tr>
                <tr v-if="localCategories.length === 0">
                  <td colspan="3" class="p-10 text-center text-base-content/50">No categories yet. Add one above.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Add Category Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="closeAddModal"
    >
      <div class="card bg-base-100 shadow-2xl w-full max-w-sm relative">
        <div class="card-body gap-4">
          <button
            type="button"
            class="btn btn-circle btn-sm btn-error absolute -right-3 -top-3 shadow"
            @click="closeAddModal"
          >✕</button>

          <h2 class="card-title text-base-content">Add Category</h2>

          <label class="form-control w-full gap-1">
            <span class="label-text font-semibold text-base-content">Category name</span>
            <input
              id="cat-name"
              type="text"
              v-model="newCategoryName"
              placeholder="e.g. Groceries"
              class="input input-bordered w-full bg-base-100 text-base-content"
              @keydown.enter.prevent="saveCategory"
            />
            <span v-if="addError" class="label-text-alt text-error">{{ addError }}</span>
          </label>

          <div class="card-actions justify-end">
            <button type="button" class="btn btn-ghost btn-sm" @click="closeAddModal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" :disabled="saving" @click="saveCategory">
              {{ saving ? 'Saving…' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Category Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="closeEditModal"
    >
      <div class="card bg-base-100 shadow-2xl w-full max-w-sm relative">
        <div class="card-body gap-4">
          <button
            type="button"
            class="btn btn-circle btn-sm btn-error absolute -right-3 -top-3 shadow"
            @click="closeEditModal"
          >✕</button>

          <h2 class="card-title text-base-content">Edit Category</h2>

          <label class="form-control w-full gap-1">
            <span class="label-text font-semibold text-base-content">Category name</span>
            <input
              id="edit-cat-name"
              type="text"
              v-model="editCategoryName"
              placeholder="e.g. Groceries"
              class="input input-bordered w-full bg-base-100 text-base-content"
              @keydown.enter.prevent="saveEdit"
            />
            <span v-if="editError" class="label-text-alt text-error">{{ editError }}</span>
          </label>

          <div class="card-actions justify-end">
            <button type="button" class="btn btn-ghost btn-sm" @click="closeEditModal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" :disabled="editing" @click="saveEdit">
              {{ editing ? 'Saving…' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="categoryToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="categoryToDelete = null"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
        <h2 class="text-lg font-bold text-gray-800 mb-2">Delete Category</h2>
        <p class="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <span class="font-semibold text-gray-900">{{ categoryToDelete.name }}</span>?
          Existing transactions using this category will keep it as a label.
        </p>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-ghost btn-sm" @click="categoryToDelete = null">Cancel</button>
          <button type="button" class="btn btn-error btn-sm text-white" @click="deleteCategory">Delete</button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { router, Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const props = defineProps({
  auth:       { type: Object, required: true },
  categories: { type: Array,  default: () => [] },
  flash:      { type: Object, default: () => ({}) },
});

// Local reactive copy so we can update without a full page reload
const localCategories = ref([...props.categories]);

// ── Add modal ──────────────────────────────────────────────
const showAddModal    = ref(false);
const newCategoryName = ref('');
const addError        = ref('');
const saving          = ref(false);

function openAddModal() {
  newCategoryName.value = '';
  addError.value = '';
  showAddModal.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
}

function saveCategory() {
  const name = newCategoryName.value.trim();

  if (!name) {
    addError.value = 'Category name is required.';
    return;
  }

  if (localCategories.value.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    addError.value = 'This category already exists.';
    return;
  }

  saving.value = true;
  addError.value = '';

  axios.post(route('categories.store'), { name })
    .then(({ data }) => {
      localCategories.value.push({ id: data.id, name: data.name });
      localCategories.value.sort((a, b) => a.name.localeCompare(b.name));
      showAddModal.value = false;
    })
    .catch((err) => {
      addError.value =
        err.response?.data?.errors?.name?.[0] ?? 'Unable to save category.';
    })
    .finally(() => {
      saving.value = false;
    });
}

// ── Edit modal ────────────────────────────────────────────
const showEditModal    = ref(false);
const categoryToEdit   = ref(null);
const editCategoryName = ref('');
const editError        = ref('');
const editing          = ref(false);

function openEditModal(cat) {
  categoryToEdit.value   = cat;
  editCategoryName.value = cat.name;
  editError.value        = '';
  showEditModal.value    = true;
}

function closeEditModal() {
  showEditModal.value = false;
  categoryToEdit.value = null;
}

function saveEdit() {
  const name = editCategoryName.value.trim();

  if (!name) {
    editError.value = 'Category name is required.';
    return;
  }

  if (
    localCategories.value.some(
      c => c.id !== categoryToEdit.value.id && c.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    editError.value = 'A category with this name already exists.';
    return;
  }

  editing.value   = true;
  editError.value = '';

  axios.put(route('categories.update', categoryToEdit.value.id), { name })
    .then(({ data }) => {
      const cat = localCategories.value.find(c => c.id === data.id);
      if (cat) {
        cat.name = data.name;
      }
      localCategories.value.sort((a, b) => a.name.localeCompare(b.name));
      showEditModal.value = false;
    })
    .catch((err) => {
      editError.value =
        err.response?.data?.errors?.name?.[0] ?? 'Unable to update category.';
    })
    .finally(() => {
      editing.value = false;
    });
}

// ── Delete modal ──────────────────────────────────────────
const categoryToDelete = ref(null);

function confirmDelete(cat) {
  categoryToDelete.value = cat;
}

function deleteCategory() {
  const cat = categoryToDelete.value;
  if (!cat) {
    return;
  }

  categoryToDelete.value = null;

  router.delete(route('categories.destroy', cat.id), {
    preserveScroll: true,
  });
}

// ── Nav helpers ───────────────────────────────────────────
function logout() {
  router.post(route('logout'));
}
</script>
