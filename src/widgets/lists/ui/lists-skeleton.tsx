import { SkeletonList } from 'shared/ui/list/ui/skeleton-list'

export const ListsSkeleton = () => {
  return (
    <>
      <SkeletonList title="Beers" img />
      <SkeletonList title="Breweries" img />
      <SkeletonList title="Styles" />
      <SkeletonList title="Countries" />
      <SkeletonList title="Regions" className="md:col-span-2" />
    </>
  )
}
