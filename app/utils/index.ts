export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getDifficultyLabel = (difficulty?: 'easy' | 'medium' | 'hard'): string => {
  const labels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
  return difficulty ? labels[difficulty] : ''
}

export const getTotalTime = (prepTime?: number, cookTime?: number): string => {
  const total = (prepTime || 0) + (cookTime || 0)
  if (total === 0) return ''
  if (total < 60) return `${total} min`
  const hours = Math.floor(total / 60)
  const mins = total % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}

export const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}
