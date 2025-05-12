import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const labelMap: Record<string, string> = {
  checkinsCount: 'Check-ins',
  beersCount: 'Unique check-ins',
  stylesCount: 'Styles',
  breweriesCount: 'Breweries',
  countriesCount: 'Countries',
  avgRating: 'Avg Rating',
}

export const StatisticsSkeleton = () => {
  return (
    <div className="mx-auto flex w-full flex-wrap justify-between gap-4">
      {Object.entries(labelMap).map(([key, _]) => (
        <ItemSkeleton label={labelMap[key]} key={key} />
      ))}
    </div>
  )
}

type Props = {
  label: string
}

const ItemSkeleton = ({ label }: Props) => {
  return (
    <Card className="flex basis-2/5 flex-col items-center rounded-md bg-background p-2 text-center">
      <p className="text-lg">{label}</p>
      <Skeleton className="h-6 w-10" />
    </Card>
  )
}
