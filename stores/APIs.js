import { defineStore } from 'pinia'

export const useStoreAPIs = defineStore('APIs', () => {
  const stripeTransactions = ref({})
  const stripeForecast = ref({})

  return { stripeTransactions, stripeForecast }
})
