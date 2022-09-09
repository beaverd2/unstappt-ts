import {eachDayOfInterval, format} from 'date-fns'
import {Beer} from 'shared/types/data'

type datasetType = {[key: string]: number}

export const useChartData = (beers: Beer[], startDate: Date, endDate: Date): [labels: string[], data: number[]] => {
  const dataset: datasetType = {}
  eachDayOfInterval({start: startDate, end: endDate})
    .map((date) => format(date, 'dd/MM/yyyy'))
    .forEach((date) => (dataset[date] = 0))

  const mapOfDates = beers
    .map((beer) => format(beer.date, 'dd/MM/yyyy'))
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {} as datasetType)

  Object.keys(mapOfDates).map((key, index) => {
    dataset[key] = mapOfDates[key]
  })

  const labels = Object.keys(dataset)
  const data = Object.values(dataset)
  return [labels, data]
}
