'use client'
import { Beer, Brewery, Country, Region, Style } from '@/types/data'
import { Item } from './ui/item'
import { formatItem, getShortStyles, filterSort } from './lib'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { CardContent, Card, CardHeader, CardTitle } from '../card'

type Props = {
  data: Beer[] | Brewery[] | Country[] | Region[] | Style[]
  title?: string
  img?: boolean
  filter?: boolean
  links?: boolean
  defaultFilter?: 'count' | 'rating'
  className?: string
  style?: boolean
}

export const List = ({
  data,
  title,
  filter = true,
  links,
  defaultFilter = 'count',
  className,
  style = false,
}: Props) => {
  const [filterValue, setFilter] = useState(defaultFilter)
  const [itemsLength, setItemsLength] = useState(5)
  const [styleType, setStyleType] = useState<'full' | 'short'>('full')
  const sortedData = filterSort(
    styleType === 'short' ? getShortStyles(data as Style[]) : data,
    filter ? filterValue : null
  )
  const items = itemsLength >= sortedData.length ? sortedData : sortedData.slice(0, itemsLength)

  useEffect(() => {
    setItemsLength(5)
    setFilter(defaultFilter)
    setStyleType('full')
  }, [data, defaultFilter])

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-center justify-between gap-2 space-y-0 p-4 md:h-[68px] md:flex-row">
        {title && <CardTitle className="self-start text-lg md:self-auto">{title}</CardTitle>}
        {style && (
          <Tabs
            value={styleType}
            onValueChange={(value) => setStyleType(value as 'full' | 'short')}
            className="w-full md:w-fit"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="full">Full styles</TabsTrigger>
              <TabsTrigger value="short">Short styles</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        {filter && (
          <Tabs
            value={filterValue}
            onValueChange={(value) => setFilter(value as 'count' | 'rating')}
            className="w-full md:w-fit"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="count">Count</TabsTrigger>
              <TabsTrigger value="rating">Rating</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Item key={item.name + index} item={formatItem(item)} filter={filterValue} link={links} />
          ))}
        </div>
        {items.length < sortedData.length && (
          <Button className="w-full" variant="outline" onClick={() => setItemsLength((length) => length + 5)}>
            Show more
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
