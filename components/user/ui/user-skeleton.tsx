import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const UserSkeleton = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-row gap-4 pt-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
