import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import {Th, Tr, chakra} from '@chakra-ui/react'
import {SortKey, SortOrder} from '../use-table-data'

interface HeadersProps {
  sortKey: string
  sortOrder: SortOrder
  changeSort: (key: SortKey) => void
}

const headers = [
  {key: 'startTime', label: 'Start time'},
  {key: 'endTime', label: 'End time'},
  {key: 'total', label: 'Total drinks'},
]

export const Headers = ({sortKey, sortOrder, changeSort}: HeadersProps) => {
  return (
    <Tr>
      {headers.map(({key, label}) => (
        <Th cursor="pointer" key={key} onClick={() => changeSort(key as SortKey)} isNumeric={key === 'total'}>
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
