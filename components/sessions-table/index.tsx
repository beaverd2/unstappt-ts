'use client'
import { Table } from '@/components/ui/table'
import { Beer } from '@/types/data'
import { Header } from './ui/header'
import { Body } from './ui/body'
import { useTableData } from './model'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

type Props = {
  beers: Beer[]
}

export const SessionsTable = ({ beers }: Props) => {
  const { tableData, sortKey, sortOrder, handleSort } = useTableData({ beers })

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Check-ins sessions</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-auto p-4 pt-0">
        <Table>
          <Header sortKey={sortKey} sortOrder={sortOrder} changeSort={handleSort} />
          <Body data={tableData} />
        </Table>
      </CardContent>
    </Card>
  )
}
