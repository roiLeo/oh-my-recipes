<template>
  <header class="sticky top-0 z-50 w-full bg-background/75 border-b border-muted backdrop-blur-md transition-all">
    <UContainer class="flex h-14 items-center justify-between">
      <NuxtLink class="text-xl" to="/">
        <span>👩‍🍳</span>
        <span class="ml-2 font-serif font-bold hover:text-primary">Oh My Recipes</span>
      </NuxtLink>
      <div class="flex gap-2">
        <UNavigationMenu variant="link" :items="items" />
        <ThemePicker />
      </div>
    </UContainer>
  </header>
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
