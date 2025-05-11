'use client'
import { Block } from '@/components/ui/block'
import { Chart } from './ui/chart'
import { Beer } from '@/types/data'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  beers: Beer[]
}

export const CheckinsPattern = ({ beers }: Props) => {
  const [type, setType] = useState<'days' | 'hours'>('days')

  useEffect(() => {
    setType('days')
  }, [beers])

  return (
    <Block>
      <div className="mb-2 flex flex-col items-center justify-between gap-2 md:flex-row">
        <p className="self-start text-lg font-semibold">Check-ins pattern</p>
        <Tabs value={type} onValueChange={(value) => setType(value as 'days' | 'hours')} className="w-full md:w-fit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="days">Days</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="w-full">
        <Chart beers={beers} type={type} />
      </div>
    </Block>
  )
}
