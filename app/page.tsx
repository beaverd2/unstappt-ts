'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecentUsers } from '@/widgets/recent-users'

export default function Page() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!username.trim()) return
    router.push(`/${username}`)
    setUsername('')
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          onChange={handleInput}
          value={username}
          placeholder="Enter username"
          type="text"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-400 focus:outline-none"
        />
      </form>
      <RecentUsers />
    </div>
  )
}
