import { isTask, type Task } from '../domain/task'

const STORAGE_KEY = 'taskflow.tasks.v1'

export const loadTasks = (fallback: Task[]): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return fallback

    const validTasks = parsed.filter(isTask)
    return validTasks.length === parsed.length ? validTasks : fallback
  } catch {
    return fallback
  }
}

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const clearStoredTasks = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
