<template>
  <div>
    <UPageHero
      description="Explore a collection of recipes, techniques, and stories from the kitchen. From simple weeknight dinners to elaborate weekend projects."
      headline="Welcome to OhMyRecipes"
      orientation="vertical"
      :links="links"
      :ui="{ title: 'font-serif', headline: 'uppercase' }"
    >
      <template #title>
        Culinary <span class="text-primary italic">Adventures</span> <br>for the Curious Cook
      </template>
    </UPageHero>

    <section class="pb-24">
      <div class="flex items-end justify-between mb-10">
        <h2 class="text-3xl font-semibold font-serif">Latest Recipes</h2>
        <UButton size="xl" to="/recipes" label="View all" variant="ghost" trailing-icon="i-lucide-chevron-right" />
      </div>

      <UBlogPosts>
        <UBlogPost
          v-for="(recipe, index) in latestRecipes"
          :key="index"
          v-bind="recipe"
          :to="recipe.path"
          :badge="recipe.category"
        />
      </UBlogPosts>
    </section>
  </div>
</template>

<script setup lang="ts">
const links = ref([
  {
    label: 'Browse Recipes',
    to: '/recipes',
    trailingIcon: 'i-lucide-arrow-right'
  },
  {
    label: 'Our Story',
    to: '/about',
    color: 'neutral',
    variant: 'outline',
  }
])

const { data: latestRecipes } = await useAsyncData('latest', () => {
  return queryCollection('recipes')
    .order('publishedAt', 'DESC')
    .limit(3)
    .all()
})

useSeoMeta({
  title: 'Oh My Recipes',
  ogTitle: 'Oh My Recipes',
  description: 'Culinary Adventures for the Curious Cook',
  ogDescription: 'Culinary Adventures for the Curious Cook'
})
</script>
