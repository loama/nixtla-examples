<template>
  <StripeExampleForm v-if="Object.keys(storeAPIs.stripeTransactions).length === 0" />
  <StripeExampleResults v-else />
</template>

<script setup>
import { useStoreAPIs } from '@/stores/APIs'

const storeAPIs = useStoreAPIs()
</script>