'use client'
import { Beer } from '@/types/data'
import { Header } from './ui/header'
import { Body } from './ui/body'
import { Table } from '@/components/ui/table'
import { useTableData } from './model'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

type Props = {
  beers: Beer[]
  username: string
}

export const CheckinsTable = ({ beers, username }: Props) => {
  const { tableData, sortKey, sortOrder, handleSort } = useTableData({ beers })

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Check-ins</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-auto p-4 pt-0">
        <Table>
          <Header sortKey={sortKey} sortOrder={sortOrder} changeSort={handleSort} />
          <Body data={tableData} username={username ?? ''} />
        </Table>
      </CardContent>
    </Card>
  )
}
