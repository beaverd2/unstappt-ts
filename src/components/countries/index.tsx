import React from 'react'
import {List} from 'shared/ui/list'
import {Country} from 'shared/types/data'

interface TopCountriesProps {
  countries: Country[]
  isLoading: boolean
}

export const TopCountries = ({countries, isLoading}: TopCountriesProps) => {
  return <List data={countries} title="Сountries" isLoading={isLoading} width={['100%', '49%']} filter />
}
