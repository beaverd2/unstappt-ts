import { useEffect, useMemo, useState } from 'react'
import { sortTable } from 'shared/lib/sort-table'
import { Beer } from 'shared/types/data'

export type SortKey = 'name' | 'brewery' | 'style' | 'userRating' | 'globalRating' | 'date'
export type SortOrder = 'ascn' | 'desc'
export type TableData = {
  name: string
  brewery: string
  style: string
  userRating: number
  globalRating: number
  date: string
  id: number
}[]

type Props = {
  beers: Beer[]
  defaultSortKey?: SortKey
}

export const useTableData = ({ beers, defaultSortKey = 'date' }: Props) => {
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
    () =>
      sortTable(
        beers.map((beer) => ({
          name: beer.name,
          brewery: beer.brewery,
          style: beer.style,
          userRating: beer.userRating,
          globalRating: beer.globalRating,
          date: beer.date,
          id: beer.id,
        })),
        sortKey,
        sortOrder === 'desc'
      ),
    [sortKey, sortOrder, beers]
  )

  return { tableData, handleSort, sortKey, sortOrder } as const
}
