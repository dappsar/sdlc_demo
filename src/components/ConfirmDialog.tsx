import type { Task } from '../domain/task'
import { Button } from './Button'
import { Modal } from './Modal'

type ConfirmDialogProps = {
  task: Task
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({ task, onConfirm, onCancel }: ConfirmDialogProps) => (
  <Modal
    title="Eliminar tarea"
    description="Esta acción elimina la tarea del almacenamiento local del navegador."
    onClose={onCancel}
  >
    <div className="confirm-dialog">
      <p>
        ¿Confirmás que querés eliminar <strong>{task.title}</strong>?
      </p>
      <footer className="modal__actions">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </footer>
    </div>
  </Modal>
)
