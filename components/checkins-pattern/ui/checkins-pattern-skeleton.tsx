import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const CheckinsPatternSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center justify-between gap-2 space-y-0 p-4 md:flex-row">
        <CardTitle className="self-start text-lg md:self-auto">Check-ins pattern</CardTitle>
        <Skeleton className="h-9 w-full md:w-40" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
  )
}
