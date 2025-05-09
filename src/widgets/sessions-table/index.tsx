'use client'
import { Block } from '@/shared/ui/block'
import { Table } from '@/shared/ui/table'
import { Beer } from '@/shared/types/data'
import { Header } from '@/widgets/sessions-table/ui/header'
import { Body } from '@/widgets/sessions-table/ui/body'
import { useTableData } from '@/widgets/sessions-table/model'

type Props = {
  beers: Beer[]
}

export const SessionsTable = ({ beers }: Props) => {
  const { tableData, sortKey, sortOrder, handleSort } = useTableData({ beers })

  return (
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins sessions</p>
      </div>
      <div className="w-full overflow-auto">
        <Table>
          <Header sortKey={sortKey} sortOrder={sortOrder} changeSort={handleSort} />
          <Body data={tableData} />
        </Table>
      </div>
    </Block>
  )
}
