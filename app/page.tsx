import { RecentUsers } from '@/widgets/recent-users'
import { SearchInput } from '@/widgets/search-input'

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md">
        <SearchInput
          placeholder="Enter username"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
        />
      </div>
      <RecentUsers />
    </div>
  )
}
