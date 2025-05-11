import { getChartData } from '../lib'
import { Beer } from '@/types/data'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

type Props = {
  beers: Beer[]
  type: 'days' | 'hours'
}

const chartConfig = {
  value: {
    label: 'Check-ins',
    color: '#FFBA2E',
  },
} as ChartConfig

export const Chart = ({ beers, type }: Props) => {
  const chartData = getChartData(beers)
  const data = type === 'days' ? chartData.daysData : chartData.hoursData

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} width={30} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
