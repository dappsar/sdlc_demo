import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskPriority,
  type TaskStatus,
} from '../domain/task'

export type TaskFiltersValue = {
  search: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
}

type TaskFiltersProps = {
  value: TaskFiltersValue
  resultCount: number
  onChange: (value: TaskFiltersValue) => void
  onClear: () => void
}

export const TaskFilters = ({ value, resultCount, onChange, onClear }: TaskFiltersProps) => (
  <section className="filters" aria-label="Filtros de tareas">
    <div className="filters__search field">
      <label htmlFor="task-search">Buscar</label>
      <input
        id="task-search"
        type="search"
        placeholder="Título o descripción"
        value={value.search}
        onChange={(event) => onChange({ ...value, search: event.target.value })}
      />
    </div>

    <div className="field">
      <label htmlFor="status-filter">Estado</label>
      <select
        id="status-filter"
        value={value.status}
        onChange={(event) =>
          onChange({ ...value, status: event.target.value as TaskFiltersValue['status'] })
        }
      >
        <option value="all">Todos</option>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </div>

    <div className="field">
      <label htmlFor="priority-filter">Prioridad</label>
      <select
        id="priority-filter"
        value={value.priority}
        onChange={(event) =>
          onChange({ ...value, priority: event.target.value as TaskFiltersValue['priority'] })
        }
      >
        <option value="all">Todas</option>
        {TASK_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {PRIORITY_LABELS[priority]}
          </option>
        ))}
      </select>
    </div>

    <div className="filters__footer">
      <span aria-live="polite">
        {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
      </span>
      <button className="text-button" type="button" onClick={onClear}>
        Limpiar filtros
      </button>
    </div>
  </section>
)
