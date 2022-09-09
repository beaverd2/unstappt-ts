import React from 'react'
import {List} from 'shared/ui/list'
import {Brewery} from 'shared/types/data'

interface TopBreweriesProps {
  breweries: Brewery[]
  isLoading: boolean
}

export const TopBreweries = ({breweries, isLoading}: TopBreweriesProps) => {
  return <List data={breweries} title="Breweries" isLoading={isLoading} width={['100%', '49%']} filter asLinks />
}
