import { format, getHours } from 'date-fns'
import { Beer } from '@/shared/types/data'

export type ChartData = {
  labels: string[]
  values: number[]
}

export type ChartDataPoint = {
  label: string
  value: number
}

export type TransformedChartData = {
  daysData: ChartDataPoint[]
  hoursData: ChartDataPoint[]
}

type DayCount = Record<string, number>
type HourCount = Record<string, number>

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
const HOURS_OF_DAY = Array.from({ length: 24 }, (_, hour) => `${hour}:00`)

const createEmptyDayCount = (): DayCount => DAYS_OF_WEEK.reduce((obj, day) => ({ ...obj, [day]: 0 }), {} as DayCount)

const createEmptyHourCount = (): HourCount =>
  HOURS_OF_DAY.reduce((obj, hour) => ({ ...obj, [hour]: 0 }), {} as HourCount)

const countBeersByDay = (beers: Beer[]): DayCount => {
  return beers.reduce((acc, beer) => {
    const day = format(new Date(beer.date), 'E')
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, createEmptyDayCount())
}

const countBeersByHour = (beers: Beer[]): HourCount => {
  return beers.reduce((acc, beer) => {
    const hour = getHours(new Date(beer.date)) + ':00'
    acc[hour] = (acc[hour] || 0) + 1
    return acc
  }, createEmptyHourCount())
}

const convertToChartDataPoints = (data: ChartData): ChartDataPoint[] => {
  return data.labels.map((label, index) => ({
    label,
    value: data.values[index],
  }))
}

export const getChartData = (beers: Beer[]): TransformedChartData => {
  const dayCounts = countBeersByDay(beers)
  const hourCounts = countBeersByHour(beers)

  const daysChartData: ChartData = {
    labels: Object.keys(dayCounts),
    values: Object.values(dayCounts),
  }

  const hoursChartData: ChartData = {
    labels: Object.keys(hourCounts),
    values: Object.values(hourCounts),
  }

  return {
    daysData: convertToChartDataPoints(daysChartData),
    hoursData: convertToChartDataPoints(hoursChartData),
  }
}
