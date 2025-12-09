
<template>
  <div class="max-w-4xl mx-auto px-4">
    <header class="mb-8">
      <UPageHeader :ui="{ title: 'font-serif' }" title="Food Recipes" description="Discover our latest food recipes and articles" />
    </header>

    <!-- Search and Filter Section -->
    <div class="space-y-4">
      <InputSearchBar v-model="searchValue" />

      <div class="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <UButton label="All" class="rounded-full px-4" color="neutral" :variant="selectedCat === '' ? 'solid' : 'outline'" @click="selectedCat = ''" />
          <UButton
            v-for="category in allCategories"
            :label="category"
            class="rounded-full px-4"
            color="neutral"
            :variant="selectedCat === category ? 'solid' : 'outline'"
            @click="selectedCat = category"
          />
        </div>

        <USelect v-model="selectedTag" class="w-42" :items="allTags" />
      </div>
    </div>

    <!-- Recipes List -->
    <UBlogPosts class="my-16" orientation="vertical">
      <UBlogPost
        v-for="(recipe, index) in recipes"
        orientation="horizontal"
        :key="index"
        v-bind="recipe"
        :to="recipe.path"
        :ui="{ title: 'font-serif' }"
      >
        <template #badge>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400 uppercase">{{ recipe.category }}</span>

            <template v-if="recipe.difficulty">
              <span class="text-gray-300">•</span>
              <span class="text-xs text-gray-400">{{ getDifficultyLabel(recipe.difficulty) }}</span>
            </template>

            <template v-if="recipe.prepTime || recipe.cookTime">
              <span class="text-gray-300">•</span>
              <span class="text-xs text-gray-400">{{ getTotalTime(recipe.prepTime, recipe.cookTime) }}</span>
            </template>
          </div>
        </template>
        <template #authors>
          <p class="text-xs text-gray-400">
            {{ formatDate(new Date(recipe.publishedAt)) }}
          </p>
        </template>
      </UBlogPost>
    </UBlogPosts>

    <!-- No Results Message -->
    <div v-if="!recipes?.length" class="text-center py-16">
      <p class="text-dimmed">No articles found matching your criteria.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const searchValue = ref(null)
const selectedTag = ref(null)
const selectedCat = ref('')

const { data: recipes, refresh } = await useAsyncData('recipes', () => {
  return queryCollection('recipes')
    .where('title', 'LIKE', `%${searchValue.value ?? ''}%`)
    .where('tags', 'LIKE', `%${selectedTag.value ?? ''}%`)
    .where('category', 'LIKE', `%${selectedCat.value}%`)
    .order('publishedAt', 'DESC')
    .all()
})

const defaultTag = { label: 'All', value: null }
const allCategories = [...new Set(recipes.value?.map((recipe) => recipe.category).filter(Boolean))]
const allTags = [...new Set(recipes.value?.flatMap((recipe) => recipe.tags || []).filter(Boolean))].sort().map(tag => ({ label: tag.charAt(0).toUpperCase() + tag.slice(1), value: tag })).concat(defaultTag)

watch([searchValue, selectedTag, selectedCat], () => refresh())
</script>
