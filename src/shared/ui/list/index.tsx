import {Button, Flex, Heading} from '@chakra-ui/react'
import React, {useEffect, useMemo, useState} from 'react'
import {Beer, Brewery, Country, Region, Style} from 'shared/types/data'
import {filterSort} from 'shared/lib/filter-sort'
import {Block} from '../block'
import {FilterSelect} from '../filter-select'
import {AnimatedList} from './animated-list'

interface ListProps {
  data: Beer[] | Brewery[] | Country[] | Region[] | Style[]
  title: string
  isLoading: boolean
  filter?: boolean
  width?: string[] | string
  asLinks?: boolean
  defaultFilterValue?: 'count' | 'rating'
}

export const List = ({data, title, isLoading, filter, defaultFilterValue = 'count', width, asLinks}: ListProps) => {
  const [filterValue, setFilterValue] = useState<'count' | 'rating'>(defaultFilterValue)
  const [isCompact, setIsCompact] = useState(true)

  const showButton = !isLoading && isCompact && data.length > 5

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value as 'count' | 'rating')
  }

  const handleIsCompact = () => {
    setIsCompact(false)
  }

  useEffect(() => {
    setIsCompact(true)
    setFilterValue(defaultFilterValue)
  }, [data, defaultFilterValue])

  const sortedData = useMemo(() => filterSort(data, filter ? filterValue : null), [data, filterValue, filter])

  return (
    <Block width={width}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">{title}</Heading>
        {filter && <FilterSelect onChange={handleSelect} value={filterValue} disabled={isLoading} />}
      </Flex>
      <AnimatedList
        data={isCompact ? sortedData.slice(0, 5) : sortedData}
        isLoading={isLoading}
        filter={filterValue}
        asLinks={asLinks}
      />
      {showButton && (
        <Button onClick={handleIsCompact} size="xs" alignSelf="center" width={24} variant="outline" mt="auto">
          Show more
        </Button>
      )}
    </Block>
  )
}
