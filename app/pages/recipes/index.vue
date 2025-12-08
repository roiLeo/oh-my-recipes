
<template>
  <div class="max-w-4xl mx-auto px-4">
    <header class="mb-8">
      <UPageHeader :ui="{ title: 'font-serif' }" title="Food Recipes" description="Discover our latest food recipes and articles" />
    </header>

    <!-- Search and Filter Section -->
    <div class="space-y-4">
      <UInput v-model="searchValue" icon="i-lucide-search" class="w-full" size="xl" variant="outline" placeholder="Search recipes..." />

      <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-inverted text-inverted"
            data-value="all"
          >
            All
          </button>
          <button v-for="category in allCategories"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-elevated hover:bg-accented"
          >
            {{ category }}
          </button>
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
    <div v-if="!recipes.length" class="text-center py-16">
      <p class="text-dimmed">No articles found matching your criteria.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedTag = ref('')
const searchValue = ref('')

const { data: recipes, refresh } = await useAsyncData('recipes', () => {
  return queryCollection('recipes')
    .where('title', 'LIKE', `%${searchValue.value}%`)
    .where('tags', 'LIKE', `%${selectedTag.value}%`)
    .order('publishedAt', 'DESC')
    .all()
})

const allCategories = [...new Set(recipes.value?.map((recipe) => recipe.category).filter(Boolean))]
const allTags = [...new Set(recipes.value?.flatMap((recipe) => recipe.tags || []).filter(Boolean))].sort()


function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getDifficultyLabel(difficulty?: 'easy' | 'medium' | 'hard'): string {
  const labels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
  return difficulty ? labels[difficulty] : ''
}

function getTotalTime(prepTime?: number, cookTime?: number): string {
  const total = (prepTime || 0) + (cookTime || 0)
  if (total === 0) return ''
  if (total < 60) return `${total} min`
  const hours = Math.floor(total / 60)
  const mins = total % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}

watch([searchValue, selectedTag], () => refresh())
</script>
