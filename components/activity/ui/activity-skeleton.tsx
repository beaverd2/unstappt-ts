import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ActivitySkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
  )
}
