import { useMemo, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Modal } from './components/Modal'
import { TaskCard } from './components/TaskCard'
import { TaskFilters, type TaskFiltersValue } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { TaskStats } from './components/TaskStats'
import type { Task, TaskInput } from './domain/task'
import { useTasks } from './hooks/useTasks'

const emptyFilters: TaskFiltersValue = {
  search: '',
  status: 'all',
  priority: 'all',
}

function App() {
  const { tasks, stats, createTask, updateTask, deleteTask, resetTasks } = useTasks()
  const [filters, setFilters] = useState<TaskFiltersValue>(emptyFilters)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const filteredTasks = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLocaleLowerCase('es')

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLocaleLowerCase('es').includes(normalizedSearch) ||
        task.description.toLocaleLowerCase('es').includes(normalizedSearch)
      const matchesStatus = filters.status === 'all' || task.status === filters.status
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [filters, tasks])

  const handleCreate = (input: TaskInput) => {
    createTask(input)
    setIsCreating(false)
    setAnnouncement(`Tarea ${input.title} creada.`)
  }

  const handleUpdate = (input: TaskInput) => {
    if (!editingTask) return

    updateTask(editingTask.id, input)
    setEditingTask(null)
    setAnnouncement(`Tarea ${input.title} actualizada.`)
  }

  const handleDelete = () => {
    if (!taskToDelete) return

    deleteTask(taskToDelete.id)
    setAnnouncement(`Tarea ${taskToDelete.title} eliminada.`)
    setTaskToDelete(null)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <a className="brand" href="./" aria-label="TaskFlow, inicio">
            <span className="brand__mark" aria-hidden="true">
              TF
            </span>
            <span>
              <strong>TaskFlow</strong>
              <small>Gestión simple de tareas</small>
            </span>
          </a>
          <Button variant="primary" onClick={() => setIsCreating(true)}>
            Nueva tarea
          </Button>
        </div>
      </header>

      <main id="main-content" className="main-content">
        <section className="hero">
          <div>
            <span className="eyebrow">Frontend de referencia</span>
            <h1>Organizá el trabajo sin perder el foco.</h1>
            <p>
              CRUD completo, persistencia local, filtros y pipeline de calidad preparado para
              GitHub.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              resetTasks()
              setFilters(emptyFilters)
              setAnnouncement('Datos de ejemplo restaurados.')
            }}
          >
            Restaurar datos de ejemplo
          </Button>
        </section>

        <TaskStats stats={stats} />

        <TaskFilters
          value={filters}
          resultCount={filteredTasks.length}
          onChange={setFilters}
          onClear={() => setFilters(emptyFilters)}
        />

        {filteredTasks.length > 0 ? (
          <section className="task-grid" aria-label="Listado de tareas">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={setTaskToDelete}
              />
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <h2>No hay tareas que coincidan</h2>
            <p>Probá con otros filtros o creá una tarea nueva.</p>
            <Button variant="primary" onClick={() => setIsCreating(true)}>
              Crear tarea
            </Button>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span>TaskFlow</span>
        <span>React + TypeScript + Vite</span>
      </footer>

      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {isCreating ? (
        <Modal
          title="Nueva tarea"
          description="Completá los datos principales. Podrás modificarlos después."
          onClose={() => setIsCreating(false)}
        >
          <TaskForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
        </Modal>
      ) : null}

      {editingTask ? (
        <Modal
          title="Editar tarea"
          description="Actualizá el estado, prioridad o contenido de la tarea."
          onClose={() => setEditingTask(null)}
        >
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      ) : null}

      {taskToDelete ? (
        <ConfirmDialog
          task={taskToDelete}
          onConfirm={handleDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      ) : null}
    </div>
  )
}

export default App
