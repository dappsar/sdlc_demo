import { PRIORITY_LABELS, STATUS_LABELS, type Task } from '../domain/task'
import { Button } from './Button'

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const formatDate = (date: string) => {
  if (!date) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => (
  <article className="task-card">
    <div className="task-card__topline">
      <span className={`badge badge--status-${task.status}`}>{STATUS_LABELS[task.status]}</span>
      <span className={`badge badge--priority-${task.priority}`}>
        {PRIORITY_LABELS[task.priority]}
      </span>
    </div>

    <div className="task-card__content">
      <h3>{task.title}</h3>
      <p>{task.description || 'Sin descripción.'}</p>
    </div>

    <footer className="task-card__footer">
      <div>
        <span className="task-card__label">Fecha objetivo</span>
        <strong>{formatDate(task.dueDate)}</strong>
      </div>
      <div className="task-card__actions">
        <Button variant="ghost" onClick={() => onEdit(task)} aria-label={`Editar ${task.title}`}>
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(task)}
          aria-label={`Eliminar ${task.title}`}
        >
          Eliminar
        </Button>
      </div>
    </footer>
  </article>
)
