<template>
  <div class="recipe-instructions" :data-recipe-id="recipeId">
    <div class="flex justify-end mb-6">
      <UButton
        variant="ghost"
        color="neutral"
        size="sm"
        icon="i-heroicons-arrow-path"
        @click="resetProgress"
        aria-label="Reset all instructions"
      >
        Reset Progress
      </UButton>
    </div>

    <div v-for="(group, groupIndex) in instructions" :key="groupIndex" class="mb-8">
      <h3 class="text-2xl font-serif text-content mb-4">{{ group.title }}</h3>

      <ol class="space-y-3">
        <li
          v-for="(step, stepIndex) in group.steps"
          :key="stepIndex"
          class="hover:bg-muted flex gap-4 p-4 bg-default border border-accented rounded-xl transition-all hover:shadow-sm hover:border-accented"
          :class="{
            'bg-elevated opacity-75': isStepCompleted(groupIndex, stepIndex)
          }"
          :data-step-id="getStepId(groupIndex, stepIndex)"
        >
          <div class="flex-shrink-0 pt-0.5">
            <label class="relative flex items-center justify-center w-6 h-6 cursor-pointer group">
              <input
                type="checkbox"
                class="step-checkbox peer sr-only"
                :checked="isStepCompleted(groupIndex, stepIndex)"
                @change="toggleStep(groupIndex, stepIndex)"
              />
              <div
                class="w-6 h-6 border-2 border-accented rounded-full transition-all flex items-center justify-center group-hover:border-primary/50"
                :class="{
                  'border-primary bg-primary': isStepCompleted(groupIndex, stepIndex)
                }"
              >
                <UIcon
                  name="i-heroicons-check"
                  class="w-3.5 h-3.5 text-white transition-opacity"
                  :class="isStepCompleted(groupIndex, stepIndex) ? 'opacity-100' : 'opacity-0'"
                />
              </div>
            </label>
          </div>

          <div class="flex-1 min-w-0">
            <p
              class="step-text text-base text-content transition-colors leading-relaxed"
              :class="{ 'text-content-subtle line-through': isStepCompleted(groupIndex, stepIndex) }"
            >
              <span class="text-primary font-bold mr-2">{{ stepIndex + 1 }}.</span>
              {{ step.text }}
            </p>

            <div v-if="step.timer" class="mt-2 flex items-center gap-2">
              <UButton
                variant="soft"
                color="neutral"
                size="sm"
                icon="i-heroicons-clock"
                @click="startTimer(groupIndex, stepIndex, step)"
              >
                Start timer ({{ formatTime(step.timer) }})
              </UButton>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InstructionStep {
  text: string
  timer?: number // in seconds
}

interface InstructionGroup {
  title: string
  steps: InstructionStep[]
}

interface TimerState {
  id: string
  label: string
  recipeUrl: string
  totalSeconds: number
  remainingSeconds: number
  isRunning: boolean
  startedAt: number
}

interface Props {
  instructions: InstructionGroup[]
  recipeId: string
}

const props = defineProps<Props>()

const toast = useToast()

const STORAGE_KEY_PREFIX = 'recipe_progress_'
const completedSteps = ref<Set<string>>(new Set())

const storageKey = computed(() => `${STORAGE_KEY_PREFIX}${props.recipeId}`)

// Helper functions
function getStepId(groupIndex: number, stepIndex: number): string {
  return `${props.recipeId}-${groupIndex}-${stepIndex}`
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins > 0) {
    return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`
  }
  return `${secs} sec`
}

function isStepCompleted(groupIndex: number, stepIndex: number): boolean {
  return completedSteps.value.has(getStepId(groupIndex, stepIndex))
}

// Load progress from localStorage
function loadProgress() {
  if (process.client) {
    try {
      const saved = localStorage.getItem(storageKey.value)
      if (saved) {
        const progress: string[] = JSON.parse(saved)
        completedSteps.value = new Set(progress)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }
}

// Save progress to localStorage
function saveProgress() {
  if (process.client) {
    try {
      const progress = Array.from(completedSteps.value)
      localStorage.setItem(storageKey.value, JSON.stringify(progress))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }
}

// Toggle step completion
function toggleStep(groupIndex: number, stepIndex: number) {
  const stepId = getStepId(groupIndex, stepIndex)
  if (completedSteps.value.has(stepId)) {
    completedSteps.value.delete(stepId)
  } else {
    completedSteps.value.add(stepId)
  }
  saveProgress()
}

// Reset all progress
function resetProgress() {
  completedSteps.value.clear()
  if (process.client) {
    localStorage.removeItem(storageKey.value)
  }
}

// Timer management (you'll need to integrate with your timer manager)
function startTimer(groupIndex: number, stepIndex: number, step: InstructionStep) {
  if (!step.timer) return

  const id = `timer-${getStepId(groupIndex, stepIndex)}`

  toast.add({
    id,
    title: 'Timer',
    description: step.text,
    duration: step.timer * 1_000,
    actions: [{
      icon: 'i-lucide-refresh-cw',
      label: 'Retry',
      color: 'neutral',
      variant: 'outline',
      onClick: (e) => {
        e?.stopPropagation()
        startTimer(groupIndex, stepIndex, step)
      }
    }]
  })

  console.log('Timer started:', step)
}

// Initialize on mount
onMounted(() => {
  loadProgress()
})
</script>
