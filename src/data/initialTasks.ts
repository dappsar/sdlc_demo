import type { Task } from '../domain/task'

export const initialTasks: Task[] = [
  {
    id: 'sample-1',
    title: 'Definir alcance del MVP',
    description: 'Acordar las funcionalidades que entran en la primera entrega.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-07-15',
    createdAt: '2026-07-10T12:00:00.000Z',
    updatedAt: '2026-07-15T15:30:00.000Z',
  },
  {
    id: 'sample-2',
    title: 'Implementar pantalla principal',
    description: 'Construir el tablero, los filtros y el formulario de tareas.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-07-25',
    createdAt: '2026-07-12T09:00:00.000Z',
    updatedAt: '2026-07-18T18:00:00.000Z',
  },
  {
    id: 'sample-3',
    title: 'Documentar despliegue',
    description: 'Dejar los pasos para publicar la aplicación con GitHub Pages.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-07-30',
    createdAt: '2026-07-13T10:00:00.000Z',
    updatedAt: '2026-07-13T10:00:00.000Z',
  },
]
