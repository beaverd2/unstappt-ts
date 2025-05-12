import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const headers = [
  { key: 'startTime', label: 'Start time' },
  { key: 'endTime', label: 'End time' },
  { key: 'checkins', label: 'Check-ins' },
]

export const SessionsTableSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Check-ins sessions</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-auto p-4 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key} data-numeric={header.key === 'total'}>
                  <span className="inline-flex w-fit items-center gap-1">{header.label}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header.key}>
                    <Skeleton className={cn('h-4 w-20', header.key === 'total' && 'ml-auto')} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
