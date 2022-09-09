import React from 'react'
import {List} from 'shared/ui/list'
import {Beer} from 'shared/types/data'

interface TopBeersProps {
  beers: Beer[]
  isLoading: boolean
}

export const TopBeers = ({beers, isLoading}: TopBeersProps) => {
  const sortedBeers = [...beers].sort((a: any, b: any) => b.userRating - a.userRating || a.name.localeCompare(b.name))

  return (
    <List
      data={sortedBeers}
      title="Beers"
      isLoading={isLoading}
      width={['100%', '49%']}
      asLinks
      defaultFilterValue="rating"
    />
  )
}
