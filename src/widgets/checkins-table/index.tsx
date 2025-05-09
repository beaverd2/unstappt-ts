'use client'
import { Block } from 'shared/ui/block'
import { Beer } from 'shared/types/data'
import { Header } from './ui/header'
import { Body } from './ui/body'
import { Table } from 'shared/ui/table'
import { useTableData } from './model'

type Props = {
  beers: Beer[]
  username: string
}

export const CheckinsTable = ({ beers, username }: Props) => {
  const { tableData, sortKey, sortOrder, handleSort } = useTableData({ beers })

  return (
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins</p>
      </div>
      <div className="w-full overflow-auto">
        <Table>
          <Header sortKey={sortKey} sortOrder={sortOrder} changeSort={handleSort} />
          <Body data={tableData} username={username ?? ''} />
        </Table>
      </div>
    </Block>
  )
}
