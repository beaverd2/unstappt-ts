'use client'
import { cn } from '@/shared/lib/utils'
import { Beer, Brewery, Country, Region, Style } from '@/shared/types/data'
import { Block } from '@/shared/ui/block'
import { Item } from '@/shared/ui/list/ui/item'
import { Button } from '@/shared/ui/button'
import { formatItem, getShortStyles, filterSort } from '@/shared/ui/list/lib'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
    <Block className={cn('self-start', className)}>
      <div className="mb-2 flex  flex-col items-center justify-between gap-2 md:flex-row">
        {title && <p className="self-start text-lg font-semibold">{title}</p>}
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
      </div>
      {items.map((item, index) => (
        <Item key={item.name + index} item={formatItem(item)} filter={filterValue} link={links} />
      ))}
      {items.length < sortedData.length && (
        <Button onClick={() => setItemsLength((length) => length + 5)}>Show more</Button>
      )}
    </Block>
  )
}
