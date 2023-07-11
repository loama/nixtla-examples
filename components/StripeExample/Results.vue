<template>
  <div class="pb-8">
    <StripeExampleChart v-if="Object.keys(storeAPIs.stripeForecast).length > 0" />
  
    <div class="mt-8"></div>

    <div v-for="(value, key) in historic" :key="key" class="flex justify-center">
      <div class="border bg-white text-center w-40">{{ key }}</div>
      <div class="border bg-white text-center w-40">{{ value }}</div>
    </div>

    <div v-for="(value, key) in forecast" :key="key" class="flex justify-center">
      <div class="border bg-zinc-100 text-center w-40">{{ key.split(' ')[0] }}</div>
      <div class="border bg-zinc-100 text-center w-40">{{ value }}</div>
    </div>
  </div>
</template>

<script setup>
import { useStoreAPIs } from '@/stores/APIs'

const storeAPIs = useStoreAPIs()

const historic = {
  "2023-06-23": 2453.21,
  "2023-06-24": 3101.34,
  "2023-06-25": 2803.59,
  "2023-06-26": 3204.78,
  "2023-06-27": 2655.65,
  "2023-06-28": 2907.43,
  "2023-06-29": 3352.74,
  "2023-06-30": 2754.92,
  "2023-07-01": 3055.47,
  "2023-07-02": 2951.33,
  "2023-07-03": 3253.41,
  "2023-07-04": 2703.88,
  "2023-07-05": 2805.91,
  "2023-07-06": 3302.09,
  "2023-07-07": 3151.63,
  "2023-07-08": 2852.92,
  "2023-07-09": 3001.79,
  "2023-07-10": 3102.34,
  "2023-07-11": 2904.29
}

const forecast = {
  "2023-07-12": 3108.94,
  "2023-07-13": 2873.63,
  "2023-07-14": 2995.26,
  "2023-07-15": 3116.96,
  "2023-07-16": 2883.76,
  "2023-07-17": 2816.06,
  "2023-07-18": 3307.15
}
</script>