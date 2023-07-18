import { format, getHours } from 'date-fns'
import { Beer } from 'shared/types/data'

export type ChartData = {
  labels: string[]
  values: number[]
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].reduce((obj, day) => {
  obj[day] = 0
  return obj
}, {} as Record<string, number>)

const hoursOfDay = Array.from({ length: 24 }, (_, hour) => `${hour}:00`).reduce((obj, hour) => {
  obj[hour] = 0
  return obj
}, {} as Record<string, number>)

export const getChartData = (beers: Beer[]): { daysData: ChartData; hoursData: ChartData } => {
  const mapOfDays = beers.reduce(
    (acc, beer) => {
      const day = format(new Date(beer.date), 'E')
      acc[day] = (acc[day] || 0) + 1
      return acc
    },
    { ...daysOfWeek }
  )

  const mapOfHours = beers.reduce(
    (acc, beer) => {
      const hour = getHours(new Date(beer.date)) + ':00'
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    },
    { ...hoursOfDay }
  )

  const daysData: ChartData = {
    labels: Object.keys(mapOfDays),
    values: Object.values(mapOfDays),
  }

  const hoursData: ChartData = {
    labels: Object.keys(mapOfHours),
    values: Object.values(mapOfHours),
  }

  return { daysData, hoursData }
}
