<template>
  <article v-if="recipe" class="max-w-6xl mx-auto px-6 py-12">
    <header class="text-center max-w-3xl mx-auto mb-12">
      <div class="mb-6">
        <UButton variant="link" color="neutral" to="/recipes" icon="i-lucide-arrow-left" size="md">Back to Recipes</UButton>
      </div>

      <div class="flex items-center justify-center gap-3 mb-6">
        <UBadge size="lg" variant="subtle" class="rounded-full uppercase text-xs" :label="recipe.category" />
        <UBadge size="lg" variant="outline" color="neutral" class="rounded-full uppercase text-xs" :label="getDifficultyLabel(recipe.difficulty)" />
      </div>

      <h1 class="text-4xl md:text-6xl text-content mb-6 font-serif font-medium leading-tight tracking-tight">{{ recipe.title }}</h1>
      <p class="text-xl text-content-muted mb-8 leading-relaxed max-w-2xl mx-auto">{{ recipe.description }}</p>

      <div class="flex items-center justify-center gap-8 text-sm text-content-subtle border-y border-accented py-4 max-w-lg mx-auto">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-calendar" class="text-primary size-4" />
          <time :datetime="new Date(recipe.publishedAt).toISOString()" class="text-sm text-muted">
            {{ formatDate(new Date(recipe.publishedAt)) }}
          </time>
        </div>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-user" class="text-primary size-4" />
          <span class="text-sm text-muted">Admin</span>
        </div>
      </div>
    </header>

    <div class="mb-10 rounded-xl overflow-hidden shadow-xl shadow-muted ring-1 ring-muted">
      <img
        :src="recipe.image"
        :alt="recipe.imageAlt || recipe.title"
        class="w-full h-auto object-cover max-h-[600px] hover:scale-[1.20] transition-transform duration-700 ease-in-out"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
      <aside class="lg:col-span-4 space-y-10">
        <div class="bg-default rounded-xl p-8 border border-muted shadow-sm">
          <h3 class="text-lg font-serif font-bold mb-6 text-content flex items-center gap-2">
            <span class="w-1 h-6 bg-primary rounded-full"></span>
            Details
          </h3>
          <div class="space-y-4">
            <div v-if="recipe.prepTime" class="flex justify-between items-center pb-3 border-b border-muted">
              <span class="text-sm text-content-muted font-medium">Prep Time</span>
              <span class="text-base font-bold text-content font-mono">{{ formatTime(recipe.prepTime) }}</span>
            </div>
            <div v-if="recipe.cookTime" class="flex justify-between items-center pb-3 border-b border-muted">
              <span class="text-sm text-content-muted font-medium">Cook Time</span>
              <span class="text-base font-bold text-content font-mono">{{ formatTime(recipe.cookTime) }}</span>
            </div>
            <div class="flex justify-between items-center pb-3 border-b border-muted">
              <span class="text-sm text-content-muted font-medium">Total Time</span>
              <span class="text-base font-bold text-primary font-mono">
                {{ formatTime((recipe.prepTime || 0) + (recipe.cookTime || 0)) }}
              </span>
            </div>
            <div class="flex justify-between items-center pt-1">
              <span class="text-sm text-content-muted font-medium">Servings</span>
              <span class="text-base font-bold text-content font-mono">{{ recipe.servings }} ppl</span>
            </div>
          </div>
        </div>
        <div class="sticky top-24">
          <h2 class="text-2xl font-serif text-content mb-6 font-medium">Ingredients</h2>
          <ul class="space-y-4">
            <li v-for="ingredient in recipe.ingredients" class="flex items-start gap-4 text-base text-content-muted group p-2 hover:bg-default rounded-lg transition-colors cursor-default">
              <span class="mt-2 w-2 h-2 rounded-full border-2 border-primary/40 group-hover:bg-primary group-hover:border-primary transition-all flex-shrink-0"></span>
              <span class="group-hover:text-content transition-colors leading-relaxed">{{ ingredient }}</span>
            </li>
          </ul>
        </div>

      </aside>

      <div class="lg:col-span-8">
        <UTabs variant="link" :items="tabs" class="w-full">
          <template #story>
            <ContentRenderer v-if="recipe" :value="recipe" />
          </template>
          <template #instructions>
            <RecipeInstructions
              :instructions="recipe.instructions"
              :recipe-id="recipe.path"
            />
          </template>
        </UTabs>
        <div v-if="recipe.tags && recipe.tags.length" class="my-16 pt-8 border-t border-accented">
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in recipe.tags" class="px-4 py-1.5 hover:bg-default text-sm font-medium text-content-muted rounded-full transition-colors cursor-default border border-transparent hover:border-accented">
              #{{ tag }}
            </span>
          </div>
        </div>

        <UContentSurround :surround="surround" />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const route = useRoute()

const tabs = [
  {
    label: 'The Story',
    slot: 'story',
  },
  {
    label: 'Instructions',
    slot: 'instructions',
  }
]

const { data: recipe } = await useAsyncData(route.path, () => {
  return queryCollection('recipes').path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('recipes', route.path)
})

const title = recipe.value?.seo?.title || recipe.value?.title
const description = recipe.value?.seo?.description || recipe.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: recipe.value?.image
})
</script>
