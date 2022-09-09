import React from 'react'
import {Flex} from '@chakra-ui/layout'
import {Item} from './item'
import {Beer} from 'shared/types/data'
import {useStatisticsData} from './use-statistics-data'

interface StatisticsProps {
  beers: Beer[]
  isLoading: boolean
}

const labelMap: Record<string, string> = {
  checkinsCount: 'Check-ins',
  beersCount: 'Beers',
  stylesCount: 'Styles',
  breweriesCount: 'Breweries',
  countriesCount: 'Countries',
  avgRating: 'Avg Rating',
}

export const Statistics = ({beers, isLoading}: StatisticsProps) => {
  const [statistics] = useStatisticsData(beers)

  return (
    <Flex>
      <Flex justifyContent="space-between" flexWrap="wrap" gridGap={4} mx="auto" width="100%">
        {Object.entries(statistics).map(([key, value]) => (
          <Item key={key} label={labelMap[key]} count={value} isLoading={isLoading} />
        ))}
      </Flex>
    </Flex>
  )
}
