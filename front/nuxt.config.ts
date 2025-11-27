// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  imports: {
    autoImport: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@pinia/nuxt',
    'nuxt-icon'
  ]
})
