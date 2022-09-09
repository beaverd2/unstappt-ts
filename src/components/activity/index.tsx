import React from 'react'
import {Flex, Heading} from '@chakra-ui/layout'
import {Skeleton} from '@chakra-ui/react'
import {LineChart} from './line-chart'
import {Beer} from 'shared/types/data'

interface ActivityProps {
  beers: Beer[]
  startDate: Date
  endDate: Date
  isLoading: boolean
}

export const Activity = ({beers, startDate, endDate, isLoading}: ActivityProps) => {
  return (
    <Flex marginTop={4}>
      <Flex bgColor="white" p={2} shadow="base" flexDirection="column" mx="auto" width="100%" borderRadius="base">
        <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Heading size="sm">Activity</Heading>
        </Flex>
        <Flex alignSelf="center" w="100%">
          {isLoading && <Skeleton height={56} width="100%" />}
          {!isLoading && <LineChart beers={beers} startDate={startDate} endDate={endDate} />}
        </Flex>
      </Flex>
    </Flex>
  )
}
