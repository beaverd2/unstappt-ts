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
    <div className="col-span-2 mx-auto flex w-full flex-wrap justify-between gap-4">
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
    <div className="flex basis-2/5 flex-col items-center rounded-md bg-white p-2 text-center shadow-md">
      <p className="text-2 mb-2">{label}</p>
      <div className="h-6 w-10 animate-pulse bg-gray-300"></div>
    </div>
  )
}
