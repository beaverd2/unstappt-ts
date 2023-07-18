import { Beer, Brewery, Country, Style } from 'shared/types/data'
import { Item } from './item'

const labelMap: Record<string, string> = {
  checkinsCount: 'Check-ins',
  beersCount: 'Beers',
  stylesCount: 'Styles',
  breweriesCount: 'Breweries',
  countriesCount: 'Countries',
  avgRating: 'Avg Rating',
}

type FormatStatistics = {
  beers: Beer[]
  styles: Style[]
  breweries: Brewery[]
  countries: Country[]
}

const formatStatistics = ({ beers, styles, breweries, countries }: FormatStatistics) => ({
  checkinsCount: beers.length,
  beersCount: beers.filter((beer) => beer.count === 1).length,
  stylesCount: styles.length,
  breweriesCount: breweries.length,
  countriesCount: countries.length,
  avgRating:
    beers.length > 0 ? Number((beers.reduce((acc, cur) => acc + cur.userRating, 0) / beers.length).toPrecision(3)) : 0,
})

type Props = {
  beers: Beer[]
  styles: Style[]
  breweries: Brewery[]
  countries: Country[]
}

export const StatisticsUi = ({ beers, styles, breweries, countries }: Props) => {
  const statistics = formatStatistics({
    beers,
    styles,
    breweries,
    countries,
  })
  return (
    <>
      {Object.entries(statistics).map(([key, value]) => (
        <Item label={labelMap[key]} key={key} count={value} />
      ))}
    </>
  )
}
