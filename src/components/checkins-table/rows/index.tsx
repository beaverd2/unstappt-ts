import {Td, Tr} from '@chakra-ui/react'
import {format} from 'date-fns'
import React from 'react'
import {TableData} from '../use-table-data'

interface RowsProps {
  data: TableData
  username: string
}

const openInNewTab = (username: any, data: any) => {
  const newWindow = window.open(
    `https://untappd.com/user/${username}/checkin/` + data.id,
    '_blank',
    'noopener,noreferrer'
  )
  if (newWindow) newWindow.opener = null
}

export const Rows = ({data, username}: RowsProps) => {
  return (
    <>
      {data.map((data, index) => (
        <Tr
          key={index}
          transition="0.2s"
          _hover={{bgColor: 'gray.100'}}
          cursor="pointer"
          onClick={() => openInNewTab(username, data)}
        >
          {Object.entries(data).map(([key, value]) =>
            key !== 'id' ? (
              <Td key={key} isNumeric={key === 'userRating' || key === 'globalRating'}>
                {typeof value === 'object' ? format(value, 'dd MMM yyyy HH:mm') : value}
              </Td>
            ) : null
          )}
        </Tr>
      ))}
    </>
  )
}
