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
          40802, 40300, 58009, 60032, 58032, 63400, 65400, 67400, 69400, 71400, 73400, 75400, 77400, 79400, 81400, 83400, 85400, 87400, 89400
        ],
        borderWidth: 1,
        borderColor: 'rgba(2, 132, 199, 1)',
      },{
        label: 'Predicted',
        data: [
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 89400,
          79734.0234375,
          81709,
          83866.09375,
          85866.3203125,
          87826.3203125,
          76000,
          78000
        ],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderDash: [5, 5],
        fill: ''
      },
      {
        label: 'Predicted High',
        data: [
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 89400,
          99574.9268577018,
          109768.2747065841,
          118231.5465418566,
          125548.12715290357,
          132191.92909507928,
          124600.08941533594,
          130494.0962367048
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
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 89400,
          59893.12001729821,
          53649.725293415904,
          49500.64095814339,
          46184.51347209643,
          43460.71152992073,
          27399.910584664052,
          25505.903763295195
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
