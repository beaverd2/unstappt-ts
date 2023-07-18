import { Block } from 'shared/ui/block'
import { Chart } from './ui/chart'
import { Beer } from 'shared/types/data'

type Props = {
  loading: boolean
  beers: Beer[]
  range: {
    startDate: Date
    endDate: Date
  }
}

export const Activity = ({ loading, beers, range }: Props) => {
  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Activity</p>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="h-[250px] animate-pulse bg-gray-300"></div>
        ) : (
          <Chart beers={beers} startDate={range.startDate} endDate={range.endDate} />
        )}
      </div>
    </Block>
  )
}
