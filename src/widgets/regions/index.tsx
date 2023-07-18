import {Region} from 'shared/types/data'
import {List} from 'shared/ui/list'

type Props = {
  loading: boolean
  regions: Region[]
}

export const Regions = ({loading, regions}: Props) => {
  return <List data={regions} title="Regions" className="md:col-span-2" loading={loading} />
}
