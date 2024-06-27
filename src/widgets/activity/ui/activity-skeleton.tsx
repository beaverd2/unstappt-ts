import { Block } from 'shared/ui/block'

export const ActivitySkeleton = () => {
  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Activity</p>
      </div>
      <div className="w-full">
        <div className="h-[250px] animate-pulse bg-gray-300"></div>
      </div>
    </Block>
  )
}
