<template>
  <header class="sticky top-0 z-50 w-full bg-background/75 border-b border-muted backdrop-blur-md transition-all">
    <UContainer class="flex h-14 items-center justify-between">
      <NuxtLink to="/"><span class="text-2xl">👩‍🍳</span></NuxtLink>
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
