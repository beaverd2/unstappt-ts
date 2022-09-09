import {format, getHours} from 'date-fns'
import {useEffect, useState} from 'react'
import {Beer} from 'shared/types/data'

export type chartData = {
  labels: Array<string>
  values: Array<number | null>
  max: number
}

export const useChartData = (beers: Beer[]) => {
  const [daysData, setDaysData] = useState<chartData>({
    labels: [],
    values: [],
    max: 0,
  })
  const [hoursData, setHoursData] = useState<chartData>({
    labels: [],
    values: [],
    max: 0,
  })
  useEffect(() => {
    const daysOfWeek: {
      [index: string]: number | null
    } = {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null,
    }
    const hoursOfDay: {
      [index: string]: number | null
    } = {
      '0:00': null,
      '1:00': null,
      '2:00': null,
      '3:00': null,
      '4:00': null,
      '5:00': null,
      '6:00': null,
      '7:00': null,
      '8:00': null,
      '9:00': null,
      '11:00': null,
      '12:00': null,
      '13:00': null,
      '14:00': null,
      '15:00': null,
      '16:00': null,
      '17:00': null,
      '18:00': null,
      '19:00': null,
      '20:00': null,
      '21:00': null,
      '22:00': null,
      '23:00': null,
    }
    const mapOfDays = beers
      .map((beer: any) => format(beer.date, 'E'))
      .reduce(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {} as {
          [index: string]: number
        }
      )
    const mapOfHours = beers
      .map((beer: any) => getHours(beer.date) + ':00')
      .reduce(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {} as {
          [index: string]: number
        }
      )

    Object.keys(mapOfDays).forEach((key, index) => {
      daysOfWeek[key] = mapOfDays[key]
    })

    Object.keys(mapOfHours).forEach((key, index) => {
      hoursOfDay[key] = mapOfHours[key]
    })

    setDaysData({
      labels: Object.keys(daysOfWeek),
      values: Object.values(daysOfWeek),
      max: Math.max(...(Object.values(daysOfWeek).filter((v) => v !== null) as Array<number>)) + 1,
    })
    setHoursData({
      labels: Object.keys(hoursOfDay),
      values: Object.values(hoursOfDay),
      max: Math.max(...(Object.values(hoursOfDay).filter((v) => v !== null) as Array<number>)) + 1,
    })
  }, [beers])

  return [daysData, hoursData]
}
