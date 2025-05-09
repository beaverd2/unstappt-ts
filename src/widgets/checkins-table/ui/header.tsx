import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { SortKey, SortOrder } from '@/widgets/checkins-table/model'
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table'

type Props = {
  sortKey: SortKey
  sortOrder: SortOrder
  changeSort: (key: SortKey) => void
}

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'brewery', label: 'Brewery' },
  { key: 'style', label: 'Style' },
  { key: 'userRating', label: 'User rating' },
  { key: 'globalRating', label: 'Global rating' },
  { key: 'date', label: 'Date' },
]

export const Header = ({ sortKey, sortOrder, changeSort }: Props) => {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header.key} data-numeric={header.key === 'userRating' || header.key === 'globalRating'}>
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
