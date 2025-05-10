import { cn } from '@/lib/utils'
import { Block } from '@/shared/ui/block'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

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
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins</p>
      </div>
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key} data-numeric={header.key === 'userRating' || header.key === 'globalRating'}>
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
                    {
                      <div
                        className={cn(
                          'h-4 w-20 animate-pulse bg-gray-300',
                          (header.key === 'userRating' || header.key === 'globalRating') && 'ml-auto'
                        )}
                      ></div>
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Block>
  )
}
