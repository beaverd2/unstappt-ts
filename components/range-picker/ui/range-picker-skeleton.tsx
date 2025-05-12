import { Skeleton } from '@/components/ui/skeleton'

export const RangePickerSkeleton = () => {
  return (
    <div className="w-full rounded-md border border-input shadow-sm">
      <Skeleton className="h-9" />
    </div>
  )
}
