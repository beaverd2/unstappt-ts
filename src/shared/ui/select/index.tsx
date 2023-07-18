import {SelectHTMLAttributes} from 'react'
import {cn} from 'shared/lib/utils'

type Props = {
  className?: string
  options: {value: any; label: string}[]
} & SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({options, className, ...props}: Props) => {
  return (
    <select
      className={cn(
        'block w-fit rounded-md border border-gray-100 bg-gray-100 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 shadow-sm outline-none transition-all hover:bg-gray-200 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
