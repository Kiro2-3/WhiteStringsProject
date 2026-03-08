<template>
  <input
    v-bind="$attrs"
    :type="type"
    :class="['input input-bordered w-full text-black bg-white', $attrs.class]"
    ref="inputRef"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineExpose } from 'vue';
const props = defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  isFocused: { type: Boolean, default: false }
});
const inputRef = ref(null);
defineExpose({
  focus: () => inputRef.value && inputRef.value.focus()
});
watch(() => props.isFocused, (val) => {
  if (val && inputRef.value) inputRef.value.focus();
});
onMounted(() => {
  if (props.isFocused && inputRef.value) inputRef.value.focus();
});
</script>

<style scoped>
</style>
