import {cn} from 'shared/lib/utils'
import {Beer, Brewery, Country, Region, Style} from 'shared/types/data'
import {Block} from '../block'
import {Item} from './ui/item'
import {Button} from '../button'
import {Select} from '../select'
import {formatItem, getShortStyles, filterSort} from './lib'
import {SkeletonList} from './ui/skeleton-list'
import {useState} from 'react'

type Props = {
  data: Beer[] | Brewery[] | Country[] | Region[] | Style[]
  title?: string
  loading?: boolean
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
  loading,
  img,
  filter = true,
  links,
  defaultFilter = 'count',
  className,
  style = false,
}: Props) => {
  const [filterValue, setFilter] = useState(defaultFilter)
  const [showAll, setShowAll] = useState(false)
  const [styleType, setStyleType] = useState<'full' | 'short'>('full')
  const sortedData = filterSort(
    styleType === 'short' ? getShortStyles(data as Style[]) : data,
    filter ? filterValue : null
  )
  const items = showAll ? sortedData : sortedData.slice(0, 5)

  const handleFilter = (e: any) => {
    setFilter(e.target?.value)
  }

  const handleStyle = (e: any) => {
    setStyleType(e.target?.value)
  }

  return (
    <Block className={cn('col-span-2 self-start md:col-span-1', className)}>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        {title && <p className="text-lg font-semibold">{title}</p>}
        {style && (
          <Select
            value={styleType}
            onChange={handleStyle}
            options={[
              {value: 'full', label: 'Full styles'},
              {value: 'short', label: 'Short styles'},
            ]}
          />
        )}
        {filter && (
          <Select
            value={filterValue}
            onChange={handleFilter}
            options={[
              {value: 'count', label: 'Count'},
              {value: 'rating', label: 'Rating'},
            ]}
          />
        )}
      </div>
      {loading ? (
        <SkeletonList img={img} />
      ) : (
        items.map((item, index) => (
          <Item key={item.name + index} item={formatItem(item)} filter={filterValue} link={links} />
        ))
      )}
      {!showAll && !loading && items.length < sortedData.length && (
        <Button onClick={() => setShowAll(true)}>Show more</Button>
      )}
    </Block>
  )
}
