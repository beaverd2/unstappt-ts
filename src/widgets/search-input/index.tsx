'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchInputProps {
  placeholder?: string
  className?: string
  onSearch?: (username: string) => void
}

export const SearchInput = ({ placeholder = 'username', className = '', onSearch }: SearchInputProps) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!username.trim()) return

    if (onSearch) {
      onSearch(username)
    } else {
      router.push(`/${username}`)
    }

    setUsername('')
    if (inputRef.current) {
      inputRef.current?.blur()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleInput}
        value={username}
        placeholder={placeholder}
        type="text"
        className={className}
        ref={inputRef}
      />
    </form>
  )
}
