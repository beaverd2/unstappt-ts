import { cn } from 'shared/lib/utils'
import { Block } from 'shared/ui/block'

type Props = {
  title: string
  img?: boolean
  className?: string
}

export const SkeletonList = ({ title, img, className }: Props) => {
  return (
    <Block className={cn('col-span-2 self-start md:col-span-1', className)}>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">{title}</p>
        <div className="h-7 w-24 animate-pulse bg-gray-300"></div>
      </div>
      {new Array(5).fill(0).map((_, index) => (
        <div key={index} className="mb-4 flex items-start bg-white">
          {img && (
            <div className="mr-4 h-10 w-10 flex-shrink-0 animate-pulse self-center rounded-full bg-gray-300"></div>
          )}
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 animate-pulse bg-gray-300"></div>
            <div className="h-4 w-14 animate-pulse bg-gray-300"></div>
            {img && <div className="h-4 w-14 animate-pulse bg-gray-300"></div>}
          </div>
        </div>
      ))}
    </Block>
  )
}
