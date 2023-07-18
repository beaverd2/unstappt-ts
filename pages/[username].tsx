import Head from 'next/head'
import { useRouter } from 'next/router'
import { Statistics } from 'widgets/statistics'
import { User } from 'widgets/user'
import { Beers } from 'widgets/beers'
import { Breweries } from 'widgets/breweries'
import { Countries } from 'widgets/countries'
import { Regions } from 'widgets/regions'
import { Styles } from 'widgets/styles'
import { CheckinsTable } from 'widgets/checkins-table'
import { SessionsTable } from 'widgets/sessions-table'
import { RangePicker } from 'widgets/range-picker'
import { Activity } from 'widgets/activity'
import { CheckinsPattern } from 'widgets/checkins-pattern'
import { beersMock, userMock } from 'shared/mock'
import { formatBeerData, mapUserDataToUser } from 'shared/lib/utils'
import { format, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const today = new Date()
const weekAgo = subDays(today, 7)

type FetchBeersOnClient = {
  username?: string
  range: { startDate: Date | null; endDate: Date | null }
}

const fetchBeersOnClient = async ({ username, range }: FetchBeersOnClient) => {
  if (!range.startDate || !range.endDate || !username) return null
  try {
    const response = await fetch(
      `api/beer/${username}?startDate=${format(range.startDate, 'yyyy-MM-dd')}&endDate=${format(
        range.endDate,
        'yyyy-MM-dd'
      )}`
    )
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
  try {
    const response = await fetch(`api/user/${username}`)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error)
    }
    return data
  } catch (error) {
    throw error
  }
}

const UserPage = () => {
  const router = useRouter()
  const [range, setRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: weekAgo,
    endDate: today,
  })
  const username = Array.isArray(router.query.username) ? router.query.username[0] : router.query.username
  const userQuery = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUserOnClient(username),
    refetchOnWindowFocus: false,
  })
  const beersQuery = useQuery({
    queryKey: ['beersQuery', username, range],
    queryFn: () => fetchBeersOnClient({ username, range }),
    refetchOnWindowFocus: false,
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
  // console.log('userQuery', userQuery.error?.message)
  // console.log('beersQuery', beersQuery.error?.message)
  const user = mapUserDataToUser(userQuery.data)
  const beers = formatBeerData(beersQuery.data)
  const title = username ? `${username ?? ''} on Unstappt` : 'Unstappt'

  useEffect(() => {
    setRange({
      startDate: weekAgo,
      endDate: today,
    })
  }, [username])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container mx-auto mt-4 grid grid-cols-2 gap-4 px-4">
        <User loading={userLoading} user={user} />
        <RangePicker range={range} loading={userLoading || beersLoading} onChange={handleRange} />
        <Statistics
          loading={beersLoading}
          beers={beers.beers}
          styles={beers.styles}
          breweries={beers.breweries}
          countries={beers.countries}
        />
        <Activity loading={beersLoading} beers={beers.beers} range={range} />
        <Beers loading={beersLoading} beers={beers.beers} />
        <Breweries loading={beersLoading} breweries={beers.breweries} />
        <Styles loading={beersLoading} styles={beers.styles} />
        <Countries loading={beersLoading} countries={beers.countries} />
        <Regions loading={beersLoading} regions={beers.regions} />
        <CheckinsPattern loading={beersLoading} beers={beers.beers} />
        <SessionsTable loading={beersLoading} beers={beers.beers} />
        <CheckinsTable loading={beersLoading || userLoading} beers={beers.beers} username={user?.username} />
      </div>
    </>
  )
}

export default UserPage
