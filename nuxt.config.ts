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

  content: {
    experimental: { sqliteConnector: 'native' },
  },

  compatibilityDate: '2025-03-21'
})
