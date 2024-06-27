'use client'
import { Block } from 'shared/ui/block'
import { Chart } from './ui/chart'
import { Beer } from 'shared/types/data'
import { useRangeQuery } from 'shared/lib/use-range-query'

type Props = {
  beers: Beer[]
}

export const Activity = ({ beers }: Props) => {
  const { startDate, endDate } = useRangeQuery()

  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Activity</p>
      </div>
      <div className="w-full">
        <Chart beers={beers} startDate={startDate} endDate={endDate} />
      </div>
    </Block>
  )
}
