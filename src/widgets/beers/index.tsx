import {Beer} from 'shared/types/data'
import {List} from 'shared/ui/list'

type Props = {
  loading: boolean
  beers: Beer[]
}

export const Beers = ({beers, loading}: Props) => {
  const sortedBeers = [...beers].sort((a: any, b: any) => b.userRating - a.userRating || a.name.localeCompare(b.name))

  return <List data={sortedBeers} title="Beers" links filter={false} defaultFilter="rating" loading={loading} img />
}
