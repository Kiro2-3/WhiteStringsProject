<template>
  <div class="w-full h-full">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { Pie } from 'vue-chartjs';
import { computed } from 'vue';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const chartData = computed(() => ({
  labels: props.data.map(item => item.label),
  datasets: [
    {
      data: props.data.map(item => item.value),
      backgroundColor: [
        '#6366f1', '#a21caf', '#f59e42', '#22c55e', '#ef4444', '#0ea5e9', '#fbbf24', '#eab308', '#f472b6', '#818cf8'
      ],
      borderWidth: 1
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: false }
  }
};
</script>
<style scoped>
</style>
