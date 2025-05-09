import Image from 'next/image'
import { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

type Item = {
  name: string
  name2?: string
  img?: string
  url?: string
  count: number
  rating?: number
}

type Props = {
  item?: Item
  filter?: 'count' | 'rating'
  link?: boolean
}

type OptionalLinkProps = {
  children: ReactNode
  url?: string
  className?: string
}

const OptionalLink = ({ children, url, className }: OptionalLinkProps) => {
  return url ? (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  )
}

export const Item = ({ item, filter, link }: Props) => {
  return (
    <OptionalLink
      className={cn('mb-4 flex items-start bg-white', link && 'cursor-pointer transition-colors hover:bg-gray-50')}
      url={item?.url}
    >
      {item?.img && (
        <Image
          alt="item logo"
          src={item?.img}
          className="mr-4 h-10 w-10 self-center object-cover"
          width={40}
          height={40}
        />
      )}
      <div className="flex flex-col">
        <p className="line-clamp-1">{item?.name}</p>
        <p className="line-clamp-1">{item?.name2}</p>
        {filter === 'count' && <p>{item?.count} Total</p>}
        {filter === 'rating' && item?.rating && <p>rating: {Number(item?.rating?.toPrecision(3))}</p>}
      </div>
    </OptionalLink>
  )
}
