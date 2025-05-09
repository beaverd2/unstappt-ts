'use client'
import { getChartData } from '@/widgets/activity/lib'
import { Beer } from '@/shared/types/data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Fragment } from 'react'

type Props = {
  beers: Beer[]
  startDate: Date
  endDate: Date
}

export const Chart = ({ beers, startDate, endDate }: Props) => {
  const chartData = getChartData({ beers, startDate, endDate })

  const data = chartData.labels.map((label, index) => ({
    date: label,
    checkins: chartData.data[index],
  }))

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <XAxis
            dataKey="date"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={30}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-card p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Check-ins</span>
                        <span className="font-bold text-foreground">{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="checkins"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={renderDot}
            activeDot={renderActiveDot}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
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
  return (
    <circle
      key={key}
      cx={cx}
      cy={cy}
      r={4}
      fill="hsl(var(--primary))"
      stroke="hsl(var(--background))"
      strokeWidth={2}
    />
  )
}

const renderActiveDot = (props: DotProps) => {
  const { cx, cy, payload } = props
  const key = `active-dot-${cx}-${cy}`
  if (!cx || !cy || !payload || payload.checkins === 0) return <Fragment key={key} />
  return (
    <circle
      key={key}
      cx={cx}
      cy={cy}
      r={6}
      fill="hsl(var(--primary))"
      stroke="hsl(var(--background))"
      strokeWidth={2}
    />
  )
}
