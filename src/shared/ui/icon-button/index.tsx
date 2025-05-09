import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { cn } from '@/shared/lib/utils'

type Props = {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  icon: JSX.Element
} & ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = ({ variant = 'primary', size = 'md', className, icon, ...props }: Props) => {
  const styles = cn(
    'inline-flex items-center justify-center rounded-md border font-medium shadow-sm outline-none transition-colors focus:ring-2 disabled:pointer-events-none disabled:opacity-60 focus:ring-blue-500',
    variant === 'primary' &&
      'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600 border-gray-800 hover:border-gray-700',
    variant === 'secondary' && 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    size === 'sm' && 'p-1',
    size === 'md' && 'p-2',
    className
  )

  return (
    <div className={clsx(props.disabled && 'cursor-not-allowed')}>
      <button {...props} className={styles}>
        {icon}
      </button>
    </div>
  )
}
