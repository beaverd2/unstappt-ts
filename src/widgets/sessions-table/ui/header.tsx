import { SortKey, SortOrder } from '@/widgets/sessions-table/model'
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

type Props = {
  sortKey: SortKey
  sortOrder: SortOrder
  changeSort: (key: SortKey) => void
}
const headers = [
  { key: 'startTime', label: 'Start time' },
  { key: 'endTime', label: 'End time' },
  { key: 'checkins', label: 'Check-ins' },
]

export const Header = ({ sortKey, sortOrder, changeSort }: Props) => {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header.key} data-numeric={header.key === 'total'}>
            <span
              className="inline-flex w-fit cursor-pointer items-center gap-1"
              onClick={() => changeSort(header.key as SortKey)}
            >
              {header.label}
              {header.key === sortKey ? (
                <>
                  {sortOrder === 'ascn' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                </>
              ) : null}
            </span>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
