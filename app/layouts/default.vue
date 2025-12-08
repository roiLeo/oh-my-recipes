<template>
  <UApp>
    <div class="flex min-h-screen flex-col">
      <DefaultNavbar />

      <div class="bg-primary-50 dark:bg-neutral-950">
        <UContainer>
          <NuxtPage />
        </UContainer>
      </div>

      <DefaultFooter />
    </div>
  </UApp>
</template>
