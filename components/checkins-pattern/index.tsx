'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center justify-between gap-2 space-y-0 p-4 md:flex-row">
        <CardTitle className="self-start text-lg md:self-auto">Check-ins pattern</CardTitle>
        <Tabs value={type} onValueChange={(value) => setType(value as 'days' | 'hours')} className="w-full md:w-fit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="days">Days</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Chart beers={beers} type={type} />
      </CardContent>
    </Card>
  )
}
