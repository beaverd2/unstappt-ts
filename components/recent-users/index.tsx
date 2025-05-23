'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/lib/constants'

export const RecentUsers = () => {
  const router = useRouter()
  const [recentUsers, setRecentUsers] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_USERS)
    if (stored) {
      setRecentUsers(JSON.parse(stored))
    }
  }, [])

  const handleRecentUserClick = (user: string) => {
    router.push(`/${user}`)
  }

  if (recentUsers.length === 0) return null

  return (
    <div className="w-full max-w-md">
      <h3 className="mb-2 text-sm font-medium text-gray-600">Recent users:</h3>
      <div className="flex flex-wrap gap-2">
        {recentUsers.map((user) => (
          <button
            key={user}
            onClick={() => handleRecentUserClick(user)}
            className="rounded-full bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20"
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  )
}
