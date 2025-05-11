import { ArrowUp, ArrowDown } from 'lucide-react'
import { SortKey, SortOrder } from '../model'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
                <>{sortOrder === 'ascn' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}</>
              ) : null}
            </span>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
