<template>
  <div class="max-w-lg mx-auto">
    <div class="font-bold text-3xl mt-6">Stripe Sales Forecast</div>
    <div class="text-sm opacity-50">Input your Stripe and Nixtla API key to get the data of your recent transactions aggregated by day and a forecast of future sales.</div>

    <div class="mt-10">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Stripe Key</label>
      <label class="block text-xs font-light leading-6">
        <span class="opacity-50">You can get it from the </span>
        <a class="text-blue-500 underline" target="_blank" href="https://dashboard.stripe.com/apikeys">stripe dashboard</a>
      </label>
      <div class="mt-2">
        <input type="text" class="" placeholder="sk_live_51NLZOeLrMPzDQdwBEWY2C00fg9N7Srz" v-model="stripeKey" />
      </div>
    </div>

    <div class="mt-6">
      <label class="block text-sm font-medium leading-6 text-gray-900">Nixtla Key</label>
      <label class="block text-xs font-light leading-6">
        <span class="opacity-50">You can get it from the </span>
        <a class="text-blue-500 underline" href="https://dashboard.nixtla.io" target="_blank">nixtla dashboard</a>
      </label>
      <div class="mt-2">
        <input type="text" class="" placeholder="sdP1sjQRdDAefdZXKuAdKbbc9t7g8HqXcuW8KWar8k1SChah" v-model="nixtlaKey" />
      </div>
    </div>

    <div class="text-right mt-4">
      <button type="button" class="ml-auto inline-flex items-center gap-x-2 rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" v-on:click="fetchStripeTransactions()">
        Fetch Data
        <ArrowUpRightIcon class="-mr-0.5 h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { useStoreAPIs } from '@/stores/APIs'

const storeAPIs = useStoreAPIs()
const nixtlaKey = ref('Ek30GcFVl3Od1yOH49MEWZifyCvKYHkTaAWa65ozXR9t6V5IXxOwZo6kFo7bQonfQzj5XQK8IMNrrqj77VOoWsmPCOg9qB2LyAUjxFYrSoEEK64lx13Rc6HXd4ZHbyhvLUHOHgfaiVVh0jd70DIy0vHSmTyrZuHq0BawgZeCpKRAEkCn9aUbBCvXWhtuoqf6dgpF0Wtz39ZQkSMf529n7nMePMyUYpvz3MBA4Dip1KBLIv0FqmUoj15Z8vyJZijq')
const stripeKey = ref('sk_test_51NLZOeLrMw0MLnSZtUhPgHRB2YrPPtPma9Zzb9OspebgM8qiaIn03FNuI2ejiPzDQ2CwwyBzcqOmtePBdwBEWY2C00fg9N7Srz')


function fetchStripeTransactions() {
  console.log('fetching stripe transactions')
  axios({
    headers: {
      Authorization: `Bearer ${nixtlaKey.value}`,
    },
    method: 'POST',
    url: 'https://us-central1-nixtla-developer-portal-main.cloudfunctions.net/stripeGetTransactions',
    data: {
      stripe_api_key: stripeKey.value
    }
  })
    .then((response) => {
      storeAPIs.stripeTransactions = response.data.data
      fetchAutoMLForecast()
    })
    .catch(() => {
      alert('error, please check your api keys or try again later')
      storeAPIs.stripeTransactions = {}
    })
}

function fetchAutoMLForecast () {
  const stripeTransactions = storeAPIs.stripeTransactions
  const timestamps = []
  const values = []

  for (const [key, value] of Object.entries(stripeTransactions)) {
    timestamps.push(key)
    values.push(value)
  }

  axios({
    headers: {
      Authorization: `Bearer ${nixtlaKey.value}`,
    },
    method: 'POST',
    url: 'https://dashboard.nixtla.io/api/automl_forecast',
    data: {
      timestamp: timestamps,
      value: values,
      fh: 7
    }
  })
    .then((response) => {
      const high = {}
      const low = {}
      const expected = {}

      for (let i = 0; i < response.data.data.timestamp.length; i++) {
        const element = response.data.data.timestamp[i]
        high[element] = response.data.data.hi[i]
        
        if (response.data.data.lo[i] > 0){
          low[element] = response.data.data.lo[i]
        } else {
          low[element] = 0
        }
        
        expected[element] = response.data.data.value[i]
      }

      storeAPIs.stripeForecast = {
        high,
        low,
        expected
      }
    })
    .catch((error) => {
      console.log(error)
      alert('error in step 2, please check your api keys or try again later')
      storeAPIs.stripeTransactions = {}
    })
}
</script>

<style lang="sass" scoped>
input
  @apply block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2
</style>