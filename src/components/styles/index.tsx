import React, {useState, useEffect, useMemo} from 'react'
import {Flex, Heading} from '@chakra-ui/layout'
import {Button, Switch} from '@chakra-ui/react'
import {AnimatedList} from 'shared/ui/list/animated-list'
import {Style} from 'shared/types/data'
import {FilterSelect} from 'shared/ui/filter-select'
import {Block} from 'shared/ui/block'
import {filterSort} from 'shared/lib/filter-sort'

interface TopStylesProps {
  styles: Style[]
  isLoading: boolean
}

export const TopStyles = ({styles, isLoading}: TopStylesProps) => {
  const [filter, setFilter] = useState<'count' | 'rating'>('count')
  const [isCompact, setIsCompact] = useState(true)
  const [isFull, setIsFull] = useState(true)

  const showButton = !isLoading && isCompact && styles.length > 5

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'count' | 'rating')
  }
  const handleIsCompact = () => {
    setIsCompact(false)
  }
  const handleIsFull = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFull(e.target.checked)
  }

  useEffect(() => {
    setIsCompact(true)
    setFilter('count')
    setIsFull(true)
  }, [styles])

  const shortStyle = useMemo(() => getShortStyles(styles), [styles])

  const sortedStyles = useMemo(
    () => filterSort(isFull ? styles : shortStyle, filter),
    [styles, shortStyle, isFull, filter]
  )

  return (
    <Block width={['100%', '49%']}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Styles</Heading>
        <Switch isDisabled={isLoading} isChecked={isFull} onChange={handleIsFull} />
        <FilterSelect onChange={handleSelect} value={filter} disabled={isLoading} />
      </Flex>
      <AnimatedList data={isCompact ? sortedStyles.slice(0, 5) : sortedStyles} isLoading={isLoading} filter={filter} />
      {showButton && (
        <Button onClick={handleIsCompact} size="xs" alignSelf="center" width={24} variant="outline" mt="auto">
          Show more
        </Button>
      )}
    </Block>
  )
}

const getShortStyles = (styles: Style[]) => {
  const obj: Record<string, Style> = {}
  for (const style of styles) {
    const name = style.name.split('-')[0]
    if (obj[name] === undefined) {
      obj[name] = {
        name: name,
        sumRating: style.sumRating,
        avgRating: style.avgRating,
        count: style.count,
      }
    }
    obj[name].count += style.count
    obj[name].sumRating += style.sumRating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
  return Object.values(obj)
}
