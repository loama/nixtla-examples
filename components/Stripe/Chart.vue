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
        data: historic,
        borderWidth: 1,
        borderColor: 'rgba(2, 132, 199, 1)',
      },{
        label: 'Predicted',
        data: predicted,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderDash: [5, 5],
        fill: ''
      },
      {
        label: 'Predicted High',
        data: predictedHigh,
        borderWidth: 1,
        borderColor: 'green',
        borderDash: [5, 5],
        backgroundColor: 'rgba(0,255,0,0.1)',
        fill: '1'
      },
      {
        label: 'Predicted Low',
        data: predictedLow,
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
