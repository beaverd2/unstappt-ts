'use client'
import { cn } from 'shared/lib/utils'
import { Beer, Brewery, Country, Region, Style } from 'shared/types/data'
import { Block } from '../block'
import { Item } from './ui/item'
import { Button } from '../button'
import { Select } from '../select'
import { formatItem, getShortStyles, filterSort } from './lib'
import { useEffect, useState } from 'react'

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

  const handleFilter = (e: any) => {
    setFilter(e.target?.value)
  }

  const handleStyle = (e: any) => {
    setStyleType(e.target?.value)
  }

  useEffect(() => {
    setItemsLength(5)
    setFilter(defaultFilter)
    setStyleType('full')
  }, [data, defaultFilter])

  return (
    <Block className={cn('col-span-2 self-start md:col-span-1', className)}>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        {title && <p className="text-lg font-semibold">{title}</p>}
        {style && (
          <Select
            value={styleType}
            onChange={handleStyle}
            options={[
              { value: 'full', label: 'Full styles' },
              { value: 'short', label: 'Short styles' },
            ]}
          />
        )}
        {filter && (
          <Select
            value={filterValue}
            onChange={handleFilter}
            options={[
              { value: 'count', label: 'Count' },
              { value: 'rating', label: 'Rating' },
            ]}
          />
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
