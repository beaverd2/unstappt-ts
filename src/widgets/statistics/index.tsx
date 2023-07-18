import {StatisticsUi} from './ui/statistics-ui'
import {StatisticsSkeleton} from './ui/statistics-skeleton'
import {Beer, Brewery, Country, Style} from 'shared/types/data'

type Props = {
  loading: boolean
  beers: Beer[]
  styles: Style[]
  breweries: Brewery[]
  countries: Country[]
}

export const Statistics = ({loading, beers, styles, breweries, countries}: Props) => {
  return (
    <div className="col-span-2 mx-auto flex w-full flex-wrap justify-between gap-4">
      {loading ? (
        <StatisticsSkeleton />
      ) : (
        <StatisticsUi beers={beers} styles={styles} breweries={breweries} countries={countries} />
      )}
    </div>
  )
}
