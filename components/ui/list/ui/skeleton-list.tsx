import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  title: string
  img?: boolean
  className?: string
}

export const SkeletonList = ({ title, img, className }: Props) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-center justify-between gap-2 space-y-0 p-4 md:h-[68px] md:flex-row">
        <CardTitle className="self-start text-lg md:self-auto">{title}</CardTitle>
        <div className="w-full md:w-fit">
          <Skeleton className="h-9 md:w-40" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        <div className="flex flex-col gap-2">
          {new Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              {img && <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-14" />
                {img && <Skeleton className="h-4 w-14" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
