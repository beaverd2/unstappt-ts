import { differenceInHours } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { sortTable } from 'shared/lib/sort-table'
import { Beer } from 'shared/types/data'

export type SortKey = 'startTime' | 'endTime' | 'total'
export type SortOrder = 'ascn' | 'desc'
export type TableData = {
  startTime: string
  endTime: string
  total: number
}[]

type Props = {
  beers: Beer[]
  defaultSortKey?: SortKey
}

export const useTableData = ({ beers, defaultSortKey = 'startTime' }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>(defaultSortKey)
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')

  const handleSort = (key: SortKey) => {
    if (sortOrder === 'desc' && key === sortKey) {
      setSortOrder('ascn')
      setSortKey(defaultSortKey)
      return
    }
    setSortOrder(key !== sortKey ? 'ascn' : 'desc')
    setSortKey(key)
  }

  useEffect(() => {
    setSortKey(defaultSortKey)
    setSortOrder('ascn')
  }, [beers, defaultSortKey])

  const tableData = useMemo(
    () => sortTable(getSessions(beers), sortKey, sortOrder === 'desc'),
    [beers, sortKey, sortOrder]
  )

  return { tableData, handleSort, sortKey, sortOrder } as const
}

const getSessions = (beers: Beer[]): TableData => {
  const sortedArray = [...beers].sort((a, b) => a.id - b.id).map((beer) => new Date(beer.date))
  let data: Record<string, any> = {}
  let counter = 0
  for (let i = 0; i < sortedArray.length - 1; i++) {
    if (differenceInHours(sortedArray[i + 1], sortedArray[i]) < 2) {
      data[counter] =
        data[counter] === undefined
          ? [sortedArray[i], sortedArray[i + 1]]
          : [...data[counter], sortedArray[i], sortedArray[i + 1]]
    } else counter++
  }
  Object.entries(data).forEach(([key, value]) => {
    data[key] = [...new Set(value)]
  })
  const filteredByValue = Object.fromEntries(Object.entries(data).filter(([key, value]) => value.length > 2))
  return Object.values(filteredByValue).map((session) => ({
    startTime: session[0],
    endTime: session[session.length - 1],
    total: session.length,
  }))
}
