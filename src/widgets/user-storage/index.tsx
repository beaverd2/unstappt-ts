'use client'

import { useEffect } from 'react'
import { User } from 'shared/types/data'
import { STORAGE_KEYS } from 'shared/constants'

type Props = {
  user: User
}

const MAX_USERS = 5

export const UserStorage = ({ user }: Props) => {
  useEffect(() => {
    const storedUsernames = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_USERS) || '[]') as string[]

    if (!storedUsernames.includes(user.username)) {
      const updatedUsernames = [user.username, ...storedUsernames]
      const trimmedUsernames = updatedUsernames.slice(0, MAX_USERS)

      localStorage.setItem(STORAGE_KEYS.RECENT_USERS, JSON.stringify(trimmedUsernames))
    }
  }, [user.username])

  return null
}
