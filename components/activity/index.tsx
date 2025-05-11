'use client'
import { Chart } from './ui/chart'
import { Beer } from '@/types/data'
import { useRangeQuery } from '@/hooks/use-range-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  beers: Beer[]
}

export const Activity = ({ beers }: Props) => {
  const { startDate, endDate } = useRangeQuery()

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Chart beers={beers} startDate={startDate} endDate={endDate} />
      </CardContent>
    </Card>
  )
}
