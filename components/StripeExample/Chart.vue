<template>
  <div class="mx-8">
    <div class="text-center mb-8 mt-4 text-lg">Stripe Sales Prediction</div>
    <canvas id="lineChart" ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { useStoreAPIs } from '@/stores/APIs'

const storeAPIs = useStoreAPIs()

onMounted(() => {
  const ctx = document.getElementById('lineChart')

  const dates = []

  const historic = []
  const predicted = []
  const predictedHigh = []
  const predictedLow = []

  // iterate over storeAPIs.stripeTransactions object
  const entries = Object.entries(storeAPIs.stripeTransactions);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    dates.push(key);
    historic.push(value);
    predicted.push(i === entries.length - 1 ? value : null);
    predictedHigh.push(i === entries.length - 1 ? value : null);
    predictedLow.push(i === entries.length - 1 ? value : null);
  }

  // iterate over storeAPIs.stripeForecast.expected object
  for (const [key, value] of Object.entries(storeAPIs.stripeForecast.expected)) {
    dates.push(key.split(' ')[0])
    predicted.push(value)
  }

  for (const [key, value] of Object.entries(storeAPIs.stripeForecast.high)) {
    predictedHigh.push(value)
  }

  for (const [key, value] of Object.entries(storeAPIs.stripeForecast.low)) {
    predictedLow.push(value)
  }

  console.log(dates)
  console.log(historic)
  console.log(predicted)
  console.log(predictedHigh)
  console.log(predictedLow)

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Historic Sales',
        data: [
          2453.21, 3101.34, 2803.59, 3204.78, 2655.65, 2907.43, 3352.74, 2754.92, 3055.47, 2951.33, 3253.41, 2703.88, 2805.91, 3302.09, 3151.63, 2852.92, 3001.79, 3102.34, 2904.29
        ],
        borderWidth: 1,
        borderColor: 'rgba(2, 132, 199, 1)',
      },{
        label: 'Predicted',
        data: [
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2904.29,
          3108.94189453125,
          2873.6337890625,
          2995.2666015625,
          3116.960693359375,
          2883.7666015625,
          2816.06201171875,
          3307.155029296875
        ],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderDash: [5, 5],
        fill: ''
      },
      {
        label: 'Predicted High',
        data: [
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2904.29,
          3732.224888385894,
          3755.089052168244,
          4074.8244144123837,
          4363.526681068663,
          4277.469745041068,
          4342.787312016891,
          4956.2068274520625
        ],
        borderWidth: 1,
        borderColor: 'green',
        borderDash: [5, 5],
        backgroundColor: 'rgba(0,255,0,0.1)',
        fill: '1'
      },
      {
        label: 'Predicted Low',
        data: [
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2904.29,
          2485.658900676606,
          1992.178525956756,
          1915.7087887126163,
          1870.3947056500872,
          1490.0634580839323,
          1289.3367114206092,
          1658.1032311416875
        ],
        borderWidth: 1,
        borderColor: 'orange',
        borderDash: [5, 5],
        backgroundColor: 'rgba(255,0,0,0.1)',
        fill: '1'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
})
</script>
