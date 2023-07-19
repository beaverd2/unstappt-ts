import { useRouter } from 'next/router'
import { useToast } from './use-toast'
import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { formatBeerData, mapUserDataToUser } from './utils'

const today = new Date()
const weekAgo = subDays(today, 7)

type FetchBeersOnClient = {
  username?: string
  range: { startDate: Date | null; endDate: Date | null }
}

const fetchBeersOnClient = async ({ username, range }: FetchBeersOnClient) => {
  if (!range.startDate || !range.endDate || !username) {
    return null
  }

  const startDate = format(range.startDate, 'yyyy-MM-dd')
  const endDate = format(range.endDate, 'yyyy-MM-dd')

  try {
    const response = await fetch(`api/beer/${username}?startDate=${startDate}&endDate=${endDate}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    throw error
  }
}

const fetchUserOnClient = async (username?: string) => {
  if (!username) return null

  const response = await fetch(`api/user/${username}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error)
  }

  return data
}

export const useUserPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [range, setRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: weekAgo,
    endDate: today,
  })
  const username = Array.isArray(router.query.username) ? router.query.username[0] : router.query.username
  const userQuery = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUserOnClient(username),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError(error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      })
      if (userQuery.data) {
        router.back()
        return
      }
      router.replace('/')
    },
    onSuccess: () => {
      setRange({
        startDate: weekAgo,
        endDate: today,
      })
    },
  })
  const beersQuery = useQuery({
    queryKey: ['beers', username, range],
    queryFn: () => fetchBeersOnClient({ username, range }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
    onError(error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      })
      if (userQuery.data) {
        router.back()
        return
      }
      router.replace('/')
    },
  })

  type HandleRange = {
    startDate: Date
    endDate: Date
  }

  const handleRange = ({ startDate, endDate }: HandleRange) => {
    setRange({ startDate, endDate })
  }
  const userLoading = userQuery.isLoading || userQuery.isFetching
  const beersLoading = beersQuery.isLoading || beersQuery.isFetching
  const user = mapUserDataToUser(userQuery.data)
  const beers = formatBeerData(beersQuery.data)
  const title = username ? `${username ?? ''} on Unstappt` : 'Unstappt'

  return { title, userLoading, beersLoading, user, range, handleRange, beers } as const
}
