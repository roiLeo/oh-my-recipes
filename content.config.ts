import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Schema for individual instruction steps
const instructionStepSchema = z.object({
  text: z.string(),
  timer: z.number().optional(), // Timer in seconds (optional)
})

// Schema for instruction groups (e.g., "Preparation", "Cooking")
const instructionGroupSchema = z.object({
  title: z.string(),
  steps: z.array(instructionStepSchema),
})

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  category: z.string(),
  prepTime: z.number().optional(), // in minutes
  cookTime: z.number().optional(), // in minutes
  servings: z.number().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.array(instructionGroupSchema).optional(),
  tags: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: {
        include: 'recipes/*.md',
        prefix: 'recipes'
      },
      schema: commonSchema
    }),
  }
})
