import { Block } from 'shared/ui/block'
import { Table } from './ui/table'
import { TableSkeleton } from './ui/table-skeleton'
import { Beer } from 'shared/types/data'

type Props = {
  loading: boolean
  beers: Beer[]
  username: string
}

export const CheckinsTable = ({ loading, beers, username }: Props) => {
  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins</p>
      </div>
      <div className="w-full overflow-auto">
        {loading ? <TableSkeleton /> : <Table beers={beers} username={username} />}
      </div>
    </Block>
  )
}
