import { Data } from 'shared/types/data'
import { List } from 'shared/ui/list'

type Props = {
  data: Data
}

export const Lists = ({ data }: Props) => {
  // todo: remove sorting
  const sortedBeers = [...data.beers].sort(
    (a: any, b: any) => b.userRating - a.userRating || a.name.localeCompare(b.name, 'ru-RU')
  )

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <List data={sortedBeers} title="Beers" links filter={false} defaultFilter="rating" img />
      <List data={data.breweries} title="Breweries" links img />
      <List data={data.styles} style />
      <List data={data.countries} title="Countries" />
      <List data={data.regions} title="Regions" className="md:col-span-2" />
    </div>
  )
}
