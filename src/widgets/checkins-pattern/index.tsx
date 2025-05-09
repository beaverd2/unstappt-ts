'use client'
import { Block } from 'shared/ui/block'
import { Select } from 'shared/ui/select'
import { Chart } from './ui/chart'
import { Beer } from 'shared/types/data'
import { useEffect, useState } from 'react'

type Props = {
  beers: Beer[]
}

export const CheckinsPattern = ({ beers }: Props) => {
  const [type, setType] = useState<'days' | 'hours'>('days')

  const handleType = (e: any) => {
    setType(e.target?.value)
  }

  useEffect(() => {
    setType('days')
  }, [beers])

  return (
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins pattern</p>
        <Select
          value={type}
          onChange={handleType}
          options={[
            { value: 'days', label: 'days' },
            { value: 'hours', label: 'hours' },
          ]}
        />
      </div>
      <div className="w-full">
        <Chart beers={beers} type={type} />
      </div>
    </Block>
  )
}
