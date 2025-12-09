<template>
  <UInput
    v-model="q"
    name="q"
    placeholder="Search recipes..."
    icon="i-lucide-search"
    size="xl"
    variant="outline"
    autocomplete="off"
    :ui="{ trailing: 'pe-1' }"
    class="w-full"
  >
    <template v-if="q || q !== null" #trailing>
      <UButton color="neutral" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false" @click="q = undefined" />
    </template>
  </UInput>
</template>

<script setup lang="ts">
const q = defineModel({ type: String, default: null })
</script>
