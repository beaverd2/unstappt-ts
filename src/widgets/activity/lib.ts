import { eachDayOfInterval, format } from 'date-fns'
import { Beer } from '@/shared/types/data'

type datasetType = { [key: string]: number }

type GetChartData = {
  beers: Beer[]
  startDate: Date
  endDate: Date
}

export const getChartData = ({ beers, startDate, endDate }: GetChartData) => {
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate }).map((date) => format(date, 'dd/MM/yyyy'))

  const beerCountsByDate = beers.reduce((counts, beer) => {
    const dateStr = format(new Date(beer.date), 'dd/MM/yyyy')
    counts[dateStr] = (counts[dateStr] || 0) + 1
    return counts
  }, {} as datasetType)

  return dateRange.map((date) => ({
    date,
    checkins: beerCountsByDate[date] || 0,
  }))
}
