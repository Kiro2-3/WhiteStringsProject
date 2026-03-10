<template>
  <div class="w-full h-full flex items-center justify-center">
    <div v-if="!hasData" class="text-sm text-gray-400">Add transactions to see the chart</div>
    <Line v-else :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const hasData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return false;
  }

  return props.data.some(item => {
    const income = Number(item.income || 0);
    const expense = Number(item.expense || 0);
    return income !== 0 || expense !== 0;
  });
});

const chartData = computed(() => ({
  labels: props.data.map(item => item.date || item.label),
  datasets: [
    {
      label: 'Income',
      data: props.data.map(item => item.income),
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,0.2)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Expense',
      data: props.data.map(item => item.expense),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239,68,68,0.2)',
      tension: 0.4,
      fill: true
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};
</script>
<style scoped>
</style>
