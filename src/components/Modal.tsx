import { useEffect, useId, useRef, type PropsWithChildren } from 'react'

type ModalProps = PropsWithChildren<{
  title: string
  description?: string
  onClose: () => void
}>

export const Modal = ({ title, description, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()

    const handleCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }

    dialog?.addEventListener('cancel', handleCancel)
    return () => dialog?.removeEventListener('cancel', handleCancel)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <section className="modal__surface">
        <header className="modal__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <button className="icon-button" type="button" aria-label="Cerrar" onClick={onClose}>
            ×
          </button>
        </header>
        {children}
      </section>
    </dialog>
  )
}
