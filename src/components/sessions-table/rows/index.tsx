import {Td, Tr} from '@chakra-ui/react'
import {format} from 'date-fns'
import React from 'react'
import {TableData} from '../use-table-data'

interface RowsProps {
  data: TableData
}

export const Rows = ({data}: RowsProps) => {
  return (
    <>
      {data.map((data, index) => (
        <Tr key={index}>
          {Object.entries(data).map(([key, value]) => (
            <Td key={key} isNumeric={key === 'total'}>
              {typeof value === 'object' ? format(value, 'dd MMM yyyy HH:mm') : value}
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}
