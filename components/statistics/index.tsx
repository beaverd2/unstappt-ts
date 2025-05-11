import { Card } from '@/components/ui/card'
import { Beer, Brewery, Country, Style } from '@/types/data'

type Props = {
  beers: Beer[]
  styles: Style[]
  breweries: Brewery[]
  countries: Country[]
}

const labelMap: Record<string, string> = {
  checkinsCount: 'Check-ins',
  beersCount: 'Unique check-ins',
  stylesCount: 'Styles',
  breweriesCount: 'Breweries',
  countriesCount: 'Countries',
  avgRating: 'Avg Rating',
}

export const Statistics = ({ beers, styles, breweries, countries }: Props) => {
  const statistics = formatStatistics({
    beers,
    styles,
    breweries,
    countries,
  })
  return (
    <div className="mx-auto flex w-full flex-wrap justify-between gap-4">
      {Object.entries(statistics).map(([key, value]) => (
        <Card
          key={key}
          className="flex basis-2/5 flex-col items-center rounded-md bg-background p-2 text-center shadow-md"
        >
          <p className="text-lg">{labelMap[key]}</p>
          <p className="text-lg font-semibold">{value}</p>
        </Card>
      ))}
    </div>
  )
}

const formatStatistics = ({ beers, styles, breweries, countries }: Props) => ({
  checkinsCount: beers.length,
  beersCount: beers.filter((beer) => beer.count === 1).length,
  stylesCount: styles.length,
  breweriesCount: breweries.length,
  countriesCount: countries.length,
  avgRating:
    beers.length > 0 ? Number((beers.reduce((acc, cur) => acc + cur.userRating, 0) / beers.length).toPrecision(3)) : 0,
})
