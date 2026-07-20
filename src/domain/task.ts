export const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
  updatedAt: string
}

export type TaskInput = Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Pendiente',
  'in-progress': 'En progreso',
  done: 'Finalizada',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

export const createTask = (input: TaskInput): Task => {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  }
}

export const updateTask = (task: Task, input: TaskInput): Task => ({
  ...task,
  ...input,
  updatedAt: new Date().toISOString(),
})

export const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== 'object') return false

  const task = value as Partial<Task>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    TASK_STATUSES.includes(task.status as TaskStatus) &&
    TASK_PRIORITIES.includes(task.priority as TaskPriority) &&
    typeof task.dueDate === 'string' &&
    typeof task.createdAt === 'string' &&
    typeof task.updatedAt === 'string'
  )
}
