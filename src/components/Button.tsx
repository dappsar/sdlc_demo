import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    fullWidth?: boolean
  }
>

export const Button = ({
  children,
  className = '',
  variant = 'secondary',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={`button button--${variant} ${fullWidth ? 'button--full' : ''} ${className}`.trim()}
    type={type}
    {...props}
  >
    {children}
  </button>
)
