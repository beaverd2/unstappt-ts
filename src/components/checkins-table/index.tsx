import {Flex, Heading} from '@chakra-ui/layout'
import React from 'react'
import {Table, Thead, Tbody, Tr, Td, Skeleton} from '@chakra-ui/react'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {Rows} from './rows'
import {Beer} from 'shared/types/data'
import {Block} from 'shared/ui/block'
import {Headers} from './headers'
import {UseTableData} from './use-table-data'

interface CheckinsTableProps {
  beers: Beer[]
  isLoading: boolean
  username: string
}

export const CheckinsTable = ({beers, isLoading, username}: CheckinsTableProps) => {
  const isMoible = useBreakpointValue({base: true, md: false})
  const [sortedData, sortKey, sortOrder, changeSort] = UseTableData(beers)

  return (
    <Block width="100%" display={isMoible ? 'none' : 'flex'}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Check-ins</Heading>
      </Flex>
      <Flex>
        <Table size="sm">
          <Thead>
            <Headers sortKey={sortKey} sortOrder={sortOrder} changeSort={changeSort} />
          </Thead>
          <Tbody>
            {!isLoading ? (
              <Rows data={sortedData} username={username} />
            ) : (
              Array.from({length: 3}).map((_, index) => (
                <Tr key={index}>
                  {Array.from({length: 6}).map((_, index) => (
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
