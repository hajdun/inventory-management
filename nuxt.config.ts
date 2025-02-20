// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  routeRules: {
    '/': {
      swr: true,
      cache: {
        maxAge: 60
      }
    },
  },
  nitro: {
    storage: {
      "foobar.json": {
        driver: 'fs',
        base: './server/assets/json/MOCK_DATA.json'
      }
    }
  }
})


