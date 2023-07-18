import { Country } from 'shared/types/data'
import { List } from 'shared/ui/list'

type Props = {
  loading: boolean
  countries: Country[]
}

export const Countries = ({ loading, countries }: Props) => {
  return <List data={countries} title="Countries" loading={loading} />
}
