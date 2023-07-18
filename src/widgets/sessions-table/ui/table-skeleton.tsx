import {cn} from 'shared/lib/utils'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from 'shared/ui/table'

const headers = [
  {key: 'startTime', label: 'Start time'},
  {key: 'endTime', label: 'End time'},
  {key: 'total', label: 'Total drinks'},
]

export const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.key} data-numeric={header.key === 'total'}>
              <span className="inline-flex w-fit  items-center gap-1">{header.label}</span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill(0).map((_, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header.key}>
                {<div className={cn('h-4 w-20 animate-pulse bg-gray-300', header.key === 'total' && 'ml-auto')}></div>}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
