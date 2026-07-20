import { beforeEach, describe, expect, it } from 'vitest'
import { initialTasks } from '../data/initialTasks'
import { clearStoredTasks, loadTasks, saveTasks } from './taskStorage'

describe('taskStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns fallback tasks when storage is empty', () => {
    expect(loadTasks(initialTasks)).toEqual(initialTasks)
  })

  it('persists and restores valid tasks', () => {
    saveTasks(initialTasks)
    expect(loadTasks([])).toEqual(initialTasks)
  })

  it('ignores corrupted data', () => {
    localStorage.setItem('taskflow.tasks.v1', '{invalid-json')
    expect(loadTasks(initialTasks)).toEqual(initialTasks)
  })

  it('clears stored tasks', () => {
    saveTasks(initialTasks)
    clearStoredTasks()
    expect(localStorage.getItem('taskflow.tasks.v1')).toBeNull()
  })
})
