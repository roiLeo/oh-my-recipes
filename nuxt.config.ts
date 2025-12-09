export default defineNuxtConfig({
  app: {
    head: {
      title: 'Oh My Recipes',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  modules: ['@nuxtjs/i18n', '@nuxt/ui', '@nuxt/content'],

  css: ['~/assets/css/main.css'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  content: {
    experimental: { nativeSqlite: true },
  },

  compatibilityDate: '2025-12-08'
})
