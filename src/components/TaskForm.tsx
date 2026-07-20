import { useEffect, useId, useState, type FormEvent } from 'react'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskInput,
} from '../domain/task'
import { Button } from './Button'

const emptyTask: TaskInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
}

type TaskFormProps = {
  task?: Task
  onSubmit: (input: TaskInput) => void
  onCancel: () => void
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [form, setForm] = useState<TaskInput>(task ?? emptyTask)
  const [submitted, setSubmitted] = useState(false)
  const titleId = useId()
  const descriptionId = useId()
  const dueDateId = useId()
  const statusId = useId()
  const priorityId = useId()

  useEffect(() => {
    setForm(task ?? emptyTask)
  }, [task])

  const titleError = form.title.trim().length < 3 ? 'Ingresá al menos 3 caracteres.' : ''
  const descriptionError =
    form.description.length > 300 ? 'La descripción no puede superar 300 caracteres.' : ''
  const hasErrors = Boolean(titleError || descriptionError)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (hasErrors) return

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={titleId}>Título</label>
        <input
          id={titleId}
          name="title"
          value={form.title}
          maxLength={80}
          autoFocus
          required
          aria-invalid={submitted && Boolean(titleError)}
          aria-describedby={submitted && titleError ? `${titleId}-error` : undefined}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
        />
        <div className="field__meta">
          {submitted && titleError ? (
            <span className="field__error" id={`${titleId}-error`}>
              {titleError}
            </span>
          ) : (
            <span>Nombre breve y accionable.</span>
          )}
          <span>{form.title.length}/80</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor={descriptionId}>Descripción</label>
        <textarea
          id={descriptionId}
          name="description"
          value={form.description}
          rows={4}
          maxLength={320}
          aria-invalid={submitted && Boolean(descriptionError)}
          aria-describedby={submitted && descriptionError ? `${descriptionId}-error` : undefined}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
        />
        <div className="field__meta">
          {submitted && descriptionError ? (
            <span className="field__error" id={`${descriptionId}-error`}>
              {descriptionError}
            </span>
          ) : (
            <span>Contexto opcional para completar la tarea.</span>
          )}
          <span>{form.description.length}/300</span>
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor={statusId}>Estado</label>
          <select
            id={statusId}
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value as TaskInput['status'],
              }))
            }
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={priorityId}>Prioridad</label>
          <select
            id={priorityId}
            value={form.priority}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                priority: event.target.value as TaskInput['priority'],
              }))
            }
          >
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={dueDateId}>Fecha objetivo</label>
          <input
            id={dueDateId}
            type="date"
            value={form.dueDate}
            onChange={(event) =>
              setForm((current) => ({ ...current, dueDate: event.target.value }))
            }
          />
        </div>
      </div>

      <footer className="modal__actions">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {task ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </footer>
    </form>
  )
}
