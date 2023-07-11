<template>
  <div id="app">
    <AppHeader />

    <div class="pt-20">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { inject } from '@vercel/analytics'
onMounted(() => inject())
</script>

<style lang="sass" scoped>
#app
  background: #F7F7F7
  min-height: 100vh
</style>
