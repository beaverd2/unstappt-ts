import { Block } from '@/components/ui/block'
export const CheckinsPatternSkeleton = () => {
  return (
    <Block>
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Check-ins pattern</p>
        <div className="h-7 w-24 animate-pulse bg-gray-300"></div>
      </div>
      <div className="w-full">
        <div className="h-[250px] animate-pulse bg-gray-300"></div>
      </div>
    </Block>
  )
}
