type TaskStatsProps = {
  stats: {
    total: number
    todo: number
    inProgress: number
    done: number
  }
}

export const TaskStats = ({ stats }: TaskStatsProps) => (
  <section className="stats" aria-label="Resumen de tareas">
    <article className="stat-card">
      <span>Total</span>
      <strong>{stats.total}</strong>
    </article>
    <article className="stat-card">
      <span>Pendientes</span>
      <strong>{stats.todo}</strong>
    </article>
    <article className="stat-card">
      <span>En progreso</span>
      <strong>{stats.inProgress}</strong>
    </article>
    <article className="stat-card">
      <span>Finalizadas</span>
      <strong>{stats.done}</strong>
    </article>
  </section>
)
