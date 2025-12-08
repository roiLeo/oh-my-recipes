<template>
  <div>
    <UPageHero
      description="Explore a collection of recipes, techniques, and stories from the kitchen. From simple weeknight dinners to elaborate weekend projects."
      headline="Welcome to Recipes"
      orientation="vertical"
      :links="links"
    >
      <template #title>
        Culinary <span class="text-primary italic">Adventures</span> <br>for the Curious Cook
      </template>
    </UPageHero>

    <section class="pb-24">
      <div class="flex items-end justify-between mb-10">
        <h2 class="text-2xl text-content">Latest Recipes</h2>
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
</script>
