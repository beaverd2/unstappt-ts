import { fetchBeers } from '@/lib/api'
import { Data } from '@/types/data'
import { Activity } from '@/components/activity'
import { CheckinsPattern } from '@/components/checkins-pattern'
import { CheckinsTable } from '@/components/checkins-table'
import { Lists } from '@/components/lists'
import { RangePicker } from '@/components/range-picker'
import { SessionsTable } from '@/components/sessions-table'
import { Statistics } from '@/components/statistics'

const getData = async (username: string, startDate?: string, endDate?: string): Promise<Data> => {
  return await fetchBeers({ username, startDate, endDate })
}

export const Stats = async ({
  username,
  startDate,
  endDate,
}: {
  username: string
  startDate?: string
  endDate?: string
}) => {
  const beers = await getData(username, startDate, endDate)

  return (
    <>
      <RangePicker />
      <Statistics beers={beers.beers} styles={beers.styles} breweries={beers.breweries} countries={beers.countries} />
      <Activity beers={beers.beers} />
      <Lists data={beers} />
      <CheckinsPattern beers={beers.beers} />
      <SessionsTable beers={beers.beers} />
      <CheckinsTable beers={beers.beers} username={username} />
    </>
  )
}
