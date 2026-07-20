import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the seeded task board', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Organizá el trabajo sin perder el foco.' }),
    ).toBeVisible()
    expect(screen.getByText('Definir alcance del MVP')).toBeVisible()
    expect(screen.getByText('Implementar pantalla principal')).toBeVisible()
  })

  it('creates a new task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Nueva tarea' }))

    const dialog = screen.getByRole('dialog')
    await user.type(within(dialog).getByLabelText('Título'), 'Configurar branch protection')
    await user.type(
      within(dialog).getByLabelText('Descripción'),
      'Exigir validaciones antes del merge.',
    )
    await user.click(within(dialog).getByRole('button', { name: 'Crear tarea' }))

    expect(screen.getByText('Configurar branch protection')).toBeVisible()
  })

  it('filters tasks by search text', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Buscar'), 'despliegue')

    expect(screen.getByText('Documentar despliegue')).toBeVisible()
    expect(screen.queryByText('Implementar pantalla principal')).not.toBeInTheDocument()
  })
})
