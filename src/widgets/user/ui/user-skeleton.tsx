import { Block } from '@/shared/ui/block'

export const UserSkeleton = () => {
  return (
    <Block className="flex-row gap-4">
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-300"></div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-12 animate-pulse bg-gray-300 md:w-40"></div>
            <div className="h-3 w-12 animate-pulse bg-gray-300 md:w-28"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-12 animate-pulse bg-gray-300"></div>
            <div className="h-3 w-10 animate-pulse bg-gray-300"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-12 animate-pulse bg-gray-300"></div>
            <div className="h-3 w-10 animate-pulse bg-gray-300"></div>
          </div>
        </div>
        <div className="h-3 w-28 animate-pulse bg-gray-300 md:w-44"></div>
      </div>
    </Block>
  )
}
