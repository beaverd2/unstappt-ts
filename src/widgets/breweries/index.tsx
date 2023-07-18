import { Brewery } from 'shared/types/data'
import { List } from 'shared/ui/list'

type Props = {
  loading: boolean
  breweries: Brewery[]
}

export const Breweries = ({ loading, breweries }: Props) => {
  return <List data={breweries} title="Breweries" links loading={loading} img />
}
