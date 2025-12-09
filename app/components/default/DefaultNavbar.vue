<template>
  <UHeader>
    <template #title>
      <NuxtLink class="text-xl" to="/">
        <span>👩‍🍳</span>
        <span class="ml-2 font-serif font-bold hover:text-primary">Oh My Recipes</span>
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu class="hidden lg:flex" variant="link" :items="items" />
      <UContentSearchButton />
      <ThemePicker />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
  const items = ref([
  {
    label: 'Recipes',
    to: '/recipes'
  },
  {
    label: 'Gallery',
    to: '/gallery'
  },
  {
    label: 'About',
    to: '/about'
  }
])
</script>
