import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'brewery', label: 'Brewery' },
  { key: 'style', label: 'Style' },
  { key: 'userRating', label: 'User rating' },
  { key: 'globalRating', label: 'Global rating' },
  { key: 'date', label: 'Date' },
]

export const CheckinsTableSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Check-ins</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-auto p-4 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key} data-numeric={header.key === 'userRating' || header.key === 'globalRating'}>
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
                    <Skeleton
                      className={cn(
                        'h-4 w-20',
                        (header.key === 'userRating' || header.key === 'globalRating') && 'ml-auto'
                      )}
                    />
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
