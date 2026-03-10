<template>
  <div class="w-full h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend, Filler);

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
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
