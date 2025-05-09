'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

export const Header = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!username.trim()) return
    router.push(`/${username}`)
    setUsername('')
    if (inputRef.current) {
      inputRef.current?.blur()
    }
  }

  return (
    <div className="w-full bg-amber-400 py-2 md:py-4">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        <Link className="text-xl font-semibold md:text-4xl" href="/" passHref>
          Unstappt
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            value={username}
            placeholder="username"
            type="text"
            className="w-40 rounded-md border-gray-300 md:w-auto"
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  )
}
