'use client'
import { getChartData } from '../lib'
import { Beer } from '@/types/data'
import { LineChart, Line, XAxis, CartesianGrid, YAxis } from 'recharts'
import { Fragment } from 'react'
import { ChartConfig, ChartTooltipContent } from '@/components/ui/chart'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'

type Props = {
  beers: Beer[]
  startDate: Date
  endDate: Date
}

const chartConfig = {
  checkins: {
    label: 'Checkins',
    color: 'hsl(var(--primary))',
  },
} as ChartConfig

export const Chart = ({ beers, startDate, endDate }: Props) => {
  const data = getChartData({ beers, startDate, endDate })

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="checkins"
          stroke="var(--color-checkins)"
          strokeWidth={2}
          dot={renderDot}
          activeDot={renderActiveDot}
        />
      </LineChart>
    </ChartContainer>
  )
}

type DotProps = {
  cx?: number
  cy?: number
  payload?: {
    checkins: number
  }
}

const renderDot = (props: DotProps) => {
  const { cx, cy, payload } = props
  const key = `dot-${cx}-${cy}`
  if (!cx || !cy || !payload || payload.checkins === 0) return <Fragment key={key} />
  return <circle key={key} cx={cx} cy={cy} r={4} fill="var(--color-checkins)" strokeWidth={2} />
}

const renderActiveDot = (props: DotProps) => {
  const { cx, cy, payload } = props
  const key = `active-dot-${cx}-${cy}`
  if (!cx || !cy || !payload || payload.checkins === 0) return <Fragment key={key} />
  return <circle key={key} cx={cx} cy={cy} r={6} fill="var(--color-checkins)" strokeWidth={2} />
}
