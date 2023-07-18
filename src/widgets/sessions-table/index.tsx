import {Block} from 'shared/ui/block'
import {Table} from './ui/table'
import {TableSkeleton} from './ui/table-skeleton'
import {Beer} from 'shared/types/data'

type Props = {
  loading: boolean
  beers: Beer[]
}

export const SessionsTable = ({loading, beers}: Props) => {
  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins sessions</p>
      </div>
      <div className="w-full overflow-auto">{loading ? <TableSkeleton /> : <Table beers={beers} />}</div>
    </Block>
  )
}
