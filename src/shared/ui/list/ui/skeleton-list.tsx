type Props = {
  img?: boolean
}

export const SkeletonList = ({img}: Props) => {
  return (
    <>
      {new Array(5).fill(0).map((_, index) => (
        <div key={index} className="mb-4 flex items-start bg-white">
          {img && (
            <div className="mr-4 h-10 w-10 flex-shrink-0 animate-pulse self-center rounded-full bg-gray-300"></div>
          )}
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 animate-pulse bg-gray-300"></div>
            <div className="h-4 w-14 animate-pulse bg-gray-300"></div>

            {img && <div className="h-4 w-14 animate-pulse bg-gray-300"></div>}
          </div>
        </div>
      ))}
    </>
  )
}
