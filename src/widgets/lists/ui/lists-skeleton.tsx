import { SkeletonList } from 'shared/ui/list/ui/skeleton-list'

export const ListsSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <SkeletonList title="Beers" img />
      <SkeletonList title="Breweries" img />
      <SkeletonList title="Styles" />
      <SkeletonList title="Countries" />
      <SkeletonList title="Regions" className="md:col-span-2" />
    </div>
  )
}
