import {ComponentPropsWithRef, HTMLAttributes, ReactNode} from 'react'
import {cn} from 'shared/lib/utils'

type Props = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLButtonElement> &
  ComponentPropsWithRef<'button'>

export const Button = ({children, className, ...props}: Props) => {
  return (
    <button
      className={cn(
        'text-md inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 active:bg-gray-100 disabled:pointer-events-none disabled:opacity-60',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
