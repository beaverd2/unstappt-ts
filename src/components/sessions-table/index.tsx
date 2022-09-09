import {Flex, Heading} from '@chakra-ui/layout'
import React from 'react'
import {Skeleton} from '@chakra-ui/react'
import {Table, Thead, Tbody, Tr, Td} from '@chakra-ui/react'
import {Beer} from 'shared/types/data'
import {Block} from 'shared/ui/block'
import {UseTableData} from './use-table-data'
import {Headers} from './headers'
import {Rows} from './rows'

interface SessionsTableProps {
  beers: Beer[]
  isLoading: boolean
}

export const SessionsTable = ({beers, isLoading}: SessionsTableProps) => {
  const [sortedData, sortKey, sortOrder, changeSort] = UseTableData(beers)

  return (
    <Block width="100%">
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Drinking Sessions</Heading>
      </Flex>
      <Flex>
        <Table size="sm">
          <Thead>
            <Headers sortKey={sortKey} sortOrder={sortOrder} changeSort={changeSort} />
          </Thead>
          <Tbody>
            {!isLoading ? (
              <Rows data={sortedData} />
            ) : (
              Array.from({length: 3}).map((_, index) => (
                <Tr key={index}>
                  {Array.from({length: 3}).map((_, index) => (
                    <Td key={index}>
                      <Skeleton h={4} w="100%" />
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Flex>
    </Block>
  )
}
