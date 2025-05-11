'use client'
import { Block } from '@/components/ui/block'
import { Chart } from './ui/chart'
import { Beer } from '@/types/data'
import { useRangeQuery } from '@/hooks/use-range-query'

type Props = {
  beers: Beer[]
}

export const Activity = ({ beers }: Props) => {
  const { startDate, endDate } = useRangeQuery()

  return (
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Activity</p>
      </div>
      <div className="w-full">
        <Chart beers={beers} startDate={startDate} endDate={endDate} />
      </div>
    </Block>
  )
}
