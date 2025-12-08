<template>
  <div class="max-w-7xl mx-auto px-4">
    <UPageSection
      :ui="{ container: '!py-16' }"
      description="Explore our recipes through the lens. A collection of textures, colors, and flavors."
      headline="Visual Feast"
      title="Culinary Gallery"
    />

    <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-24">
      <a v-for="recipe in recipesWithimages" :href="recipe.path" class="block group break-inside-avoid">
        <div class="relative overflow-hidden rounded-lg bg-stone-200">
          <img
            :src="recipe.image"
            :alt="recipe.imageAlt || recipe.title"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-6">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <span class="text-white text-sm font-medium uppercase tracking-wider mb-1 block">{{ recipe.category }}</span>
              <h3 class="text-white text-xl font-serif">{{ recipe.title }}</h3>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: recipes } = await useAsyncData('gallery', () => {
  return queryCollection('recipes')
    .order('publishedAt', 'DESC')
    .all()
})
const recipesWithimages = computed(() => recipes.value.filter(recipe => recipe.image))
</script>
