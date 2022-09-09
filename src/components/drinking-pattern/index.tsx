import {Flex, Heading} from '@chakra-ui/layout'
import React, {useState, useEffect} from 'react'
import {Select, Skeleton} from '@chakra-ui/react'
import {useChartData} from './use-chart-data'
import {BarChart} from './bar-chart'
import {Beer} from 'shared/types/data'
import {Block} from 'shared/ui/block'

interface DrinkingPatternProps {
  beers: Beer[]
  isLoading: boolean
}

export const DrinkingPattern = ({beers, isLoading}: DrinkingPatternProps) => {
  const [daysData, hoursData] = useChartData(beers)
  const [filter, setFilter] = useState<'days' | 'hours'>('days')

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'days' | 'hours')
  }

  useEffect(() => {
    setFilter('days')
  }, [beers])

  return (
    <Block width="100%">
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Drinking Pattern</Heading>
        <Select maxW={24} size="xs" value={filter} onChange={handleSelect} variant="filled" disabled={isLoading}>
          <option value="days">Days</option>
          <option value="hours">Hours</option>
        </Select>
      </Flex>
      <Flex alignSelf="center" w="100%">
        {!isLoading && <BarChart daysData={daysData} hoursData={hoursData} filter={filter} />}
        {isLoading && <Skeleton height={40} width="100%" />}
      </Flex>
    </Block>
  )
}
