export const ItemSkeleton = () => {
  return (
    <div className="flex basis-2/5 flex-col items-center rounded-md bg-white p-2 text-center shadow-md">
      <div className="mb-2 h-4 w-32 animate-pulse bg-gray-300"></div>
      <div className="h-6 w-40 animate-pulse bg-gray-300"></div>
    </div>
  )
}
