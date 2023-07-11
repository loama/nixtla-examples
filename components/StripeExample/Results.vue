<template>
  <div class="pb-8">
    <StripeExampleChart v-if="Object.keys(storeAPIs.stripeForecast).length > 0" />
  
    <div class="mt-8"></div>

    <div v-for="(value, key) in storeAPIs.stripeTransactions" :key="key" class="flex justify-center">
      <div class="border bg-white text-center w-40">{{ key }}</div>
      <div class="border bg-white text-center w-40">{{ value }}</div>
    </div>

    <div v-for="(value, key) in storeAPIs.stripeForecast.expected" :key="key" class="flex justify-center">
      <div class="border bg-zinc-100 text-center w-40">{{ key.split(' ')[0] }}</div>
      <div class="border bg-zinc-100 text-center w-40">{{ value.toFixed(0) }}</div>
    </div>
  </div>
</template>

<script setup>
import { useStoreAPIs } from '@/stores/APIs'

const storeAPIs = useStoreAPIs()
</script>