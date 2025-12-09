<template>
  <UApp>
    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        shortcut="meta_k"
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
    <div class="flex min-h-screen flex-col">
      <DefaultNavbar />

      <div class="bg-primary-50 dark:bg-neutral-950">
        <UContainer>
          <NuxtPage />
        </UContainer>
      </div>

      <DefaultFooter />
    </div>
  </UApp>
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('recipes'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('recipes'), {
  server: false
})

const searchTerm = ref('')
</script>
