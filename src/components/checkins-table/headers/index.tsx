import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import {Th, Tr, chakra} from '@chakra-ui/react'
import {SortKey, SortOrder} from '../use-table-data'

interface HeadersProps {
  sortKey: SortKey
  sortOrder: SortOrder
  changeSort: (key: SortKey) => void
}

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'brewery', label: 'Brewery'},
  {key: 'style', label: 'Style'},
  {key: 'userRating', label: 'User rating'},
  {key: 'globalRating', label: 'Global rating'},
  {key: 'date', label: 'Date'},
]

export const Headers = ({sortKey, sortOrder, changeSort}: HeadersProps) => {
  return (
    <Tr>
      {headers.map(({key, label}) => (
        <Th
          cursor="pointer"
          key={key}
          onClick={() => changeSort(key as SortKey)}
          isNumeric={key === 'userRating' || key === 'globalRating'}
        >
          <span style={{display: 'inline-flex'}}>
            {label}
            <chakra.span ml={1} alignSelf="flex-end">
              {key === sortKey ? sortOrder === 'ascn' ? <TriangleUpIcon /> : <TriangleDownIcon /> : null}
            </chakra.span>
          </span>
        </Th>
      ))}
    </Tr>
  )
}
