import { useEffect, useMemo, useReducer } from 'react'
import { initialTasks } from '../data/initialTasks'
import { createTask, updateTask, type Task, type TaskInput } from '../domain/task'
import { loadTasks, saveTasks } from '../services/taskStorage'

type TaskAction =
  | { type: 'create'; input: TaskInput }
  | { type: 'update'; id: string; input: TaskInput }
  | { type: 'delete'; id: string }
  | { type: 'replace'; tasks: Task[] }

const reducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'create':
      return [createTask(action.input), ...state]
    case 'update':
      return state.map((task) => (task.id === action.id ? updateTask(task, action.input) : task))
    case 'delete':
      return state.filter((task) => task.id !== action.id)
    case 'replace':
      return action.tasks
  }
}

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(reducer, initialTasks, (fallback) => loadTasks(fallback))

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((task) => task.status === 'todo').length,
      inProgress: tasks.filter((task) => task.status === 'in-progress').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  )

  return {
    tasks,
    stats,
    createTask: (input: TaskInput) => dispatch({ type: 'create', input }),
    updateTask: (id: string, input: TaskInput) => dispatch({ type: 'update', id, input }),
    deleteTask: (id: string) => dispatch({ type: 'delete', id }),
    resetTasks: () => dispatch({ type: 'replace', tasks: initialTasks }),
  }
}
