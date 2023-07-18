import { format, subDays } from 'date-fns'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

const today = new Date()
const weekAgo = subDays(today, 7)

export const Header = () => {
  const [username, setUsername] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    searchParams.set('startDate', format(weekAgo, 'yyyy-MM-dd'))
    searchParams.set('endDate', format(today, 'yyyy-MM-dd'))
    // navigate(`${username}?${searchParams}`)
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
