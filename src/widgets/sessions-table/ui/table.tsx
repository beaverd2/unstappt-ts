import { Body } from './body'
import { useTableData } from '../model'
import { Header } from './header'
import { Table as DataTable } from 'shared/ui/table'
import { Beer } from 'shared/types/data'

type Props = {
  beers: Beer[]
}

export const Table = ({ beers }: Props) => {
  const { tableData, sortKey, sortOrder, handleSort } = useTableData({ beers })
  return (
    <DataTable>
      <Header sortKey={sortKey} sortOrder={sortOrder} changeSort={handleSort} />
      <Body data={tableData} />
    </DataTable>
  )
}
