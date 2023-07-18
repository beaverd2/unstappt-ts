import { cn } from 'shared/lib/utils'
import { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}
const Table = ({ children, className }: Props) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)}>{children}</table>
    </div>
  )
}

const TableHeader = ({ children, className }: Props) => {
  return <thead className={cn('[&_tr]:border-b', className)}>{children}</thead>
}

const TableBody = ({ children, className }: Props) => {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)}>{children}</tbody>
}

const TableFooter = ({ children, className }: Props) => {
  return <tfoot className={cn('bg-primary text-primary-foreground font-medium', className)}>{children}</tfoot>
}

type TableRowProps = {
  onClick?: () => void
} & Props

const TableRow = ({ children, onClick, className }: TableRowProps) => {
  return (
    <tr className={cn('border-b transition-colors', className)} onClick={onClick}>
      {children}
    </tr>
  )
}

const TableHead = ({ className, children, ...props }: Props) => {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium data-[numeric="true"]:text-right [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

const TableCell = ({ children, className, ...props }: Props) => {
  return (
    <td
      className={cn('p-4 align-middle data-[numeric="true"]:text-right [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    >
      {children}
    </td>
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell }
