import {useMemo, useState} from 'react'
import {Beer} from 'shared/types/data'
import {sortTable} from 'shared/lib/sort-table'

export type SortOrder = 'ascn' | 'desc'

export type TableData = {
  name: string
  brewery: string
  style: string
  userRating: number
  globalRating: number
  date: Date
  id: number
}[]

export type SortKey = 'name' | 'brewery' | 'style' | 'userRating' | 'globalRating' | 'date'

export const UseTableData = (
  beers: Beer[],
  defaultSortKey: SortKey = 'date'
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

  const tableData = useMemo(
    () =>
      beers.map((beer) => ({
        name: beer.name,
        brewery: beer.brewery,
        style: beer.style,
        userRating: beer.userRating,
        globalRating: beer.globalRating,
        date: beer.date,
        id: beer.id,
      })),
    [beers]
  )
  const sortedData = sortTable(tableData, sortKey, sortOrder === 'desc')

  return [sortedData, sortKey, sortOrder, changeSort]
}
