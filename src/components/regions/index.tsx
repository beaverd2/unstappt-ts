import React from 'react'
import {List} from 'shared/ui/list/'
import {Region} from 'shared/types/data'

interface TopRegionsProps {
  regions: Region[]
  isLoading: boolean
}

export const TopRegions = ({regions, isLoading}: TopRegionsProps) => {
  return <List data={regions} title="Regions/States" isLoading={isLoading} width="100%" filter />
}
