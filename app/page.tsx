import { RecentUsers } from '@/components/recent-users'
import { SearchInput } from '@/components/search-input'

export default function Page() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md">
        <SearchInput className="w-full" />
      </div>
      <RecentUsers />
    </div>
  )
}
