// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/chart.js',
          async: true,
          defer: true
        }
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  plugins: [{ src: '~/plugins/vercel.js', mode: 'client' }],
  ssr: false
})
