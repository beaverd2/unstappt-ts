import {differenceInHours} from 'date-fns'
import {useMemo, useState} from 'react'
import {Beer} from 'shared/types/data'
import {sortTable} from 'shared/lib/sort-table'

export type SortOrder = 'ascn' | 'desc'

export type TableData = {
  startTime: Date
  endTime: Date
  total: number
}[]

export type SortKey = 'startTime' | 'endTime' | 'total'

export const UseTableData = (
  beers: Beer[],
  defaultSortKey: SortKey = 'startTime'
): [sortedData: TableData, sortKey: SortKey, sortOrder: SortOrder, changeSort: (key: SortKey) => void] => {
  const [sortKey, setSortKey] = useState<SortKey>(defaultSortKey)
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')

  const changeSort = (key: SortKey) => {
    if (sortOrder === 'desc' && key === sortKey) {
      setSortOrder('ascn')
      setSortKey(defaultSortKey)
      return
    }
    setSortOrder(key !== sortKey ? 'ascn' : 'desc')
    setSortKey(key)
  }

  const tableData = useMemo(() => getSessions(beers), [beers])

  const sortedData = sortTable(tableData, sortKey, sortOrder === 'desc')

  return [sortedData, sortKey, sortOrder, changeSort]
}

const getSessions = (
  beers: Beer[]
): {
  startTime: Date
  endTime: Date
  total: number
}[] => {
  const sortedArray = beers.sort((a, b) => a.id - b.id).map((beer) => beer.date)
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
