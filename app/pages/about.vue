<template>
  <div>
    <UPageSection
      :ui="{ container: '!py-16', title: 'font-serif', headline: 'uppercase' }"
      description="Exploring the universe of flavors, one recipe at a time."
      headline="Our story"
    >
      <template #title>
        We are <span class="text-primary italic">Oh My Recipes</span>
      </template>
    </UPageSection>

    <section class="max-w-3xl mx-auto px-6">
      <div class="prose prose-stone prose-lg mx-auto text-muted">
        <p>
          Welcome to <span class="font-bold font-serif italic">Oh My Recipes</span>, a digital sanctuary for food lovers, home cooks, and culinary explorers.
          We believe that cooking is more than just preparation—it's an adventure, a science, and an art form combined.
        </p>

        <h2 class="text-2xl text-content font-serif mt-12 mb-6">Our Mission</h2>
        <p>
          Our mission is simple: to inspire you to step into the kitchen with confidence and curiosity.
          Whether you're a seasoned chef or just starting to boil water, we want to provide you with
          recipes that work, techniques that elevate your skills, and stories that connect us all through food.
        </p>

        <h2 class="text-2xl text-content font-serif mt-12 mb-6">What We Offer</h2>
        <div class="grid grid-cols-1 md:grid-cols-3">
          <UPageFeature
            icon="i-lucide-badge-check"
            orientation="vertical"
            title="Reliable Recipes"
            description="Every recipe is tested to ensure success in your home kitchen."
          />
          <UPageFeature
            icon="i-lucide-biceps-flexed"
            orientation="vertical"
            title="In-depth Guides"
            description="We break down complex techniques into manageable steps."
          />
          <UPageFeature
            icon="i-lucide-book-open-text"
            orientation="vertical"
            title="Culinary Stories"
            description="We explore the history and culture behind the dishes we love."
          />
        </div>

        <div class="my-24 relative">
          <div class="absolute inset-0 bg-stone-900 rounded-3xl -rotate-1"></div>
          <div class="relative bg-stone-950 rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center border border-stone-800 shadow-2xl overflow-hidden">
            <!-- Subtle grain texture overlay could go here -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

            <span class="text-caption text-primary mb-6 block tracking-widest">Newsletter</span>

            <h3 class="text-display-m font-serif text-white mb-6">
              Join the <span class="italic text-primary-200">Culinary Conversation</span>
            </h3>

            <p class="text-lg text-stone-400 max-w-lg mx-auto mb-10 leading-relaxed">
              Elevate your kitchen game. Receive our curated weekly digest of recipes, techniques, and stories.
            </p>

            <button
              onclick="document.getElementById('subscribe-modal').showModal()"
              class="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-950 rounded-full font-medium transition-transform hover:-translate-y-1"
            >
              <span>Subscribe Now</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
