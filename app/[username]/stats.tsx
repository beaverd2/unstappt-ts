import { formatBeerData } from 'shared/lib/utils'
import { Data } from 'shared/types/data'
import { Activity } from 'widgets/activity'
import { CheckinsPattern } from 'widgets/checkins-pattern'
import { CheckinsTable } from 'widgets/checkins-table'
import { Lists } from 'widgets/lists'
import { RangePicker } from 'widgets/range-picker'
import { SessionsTable } from 'widgets/sessions-table'
import { Statistics } from 'widgets/statistics'

const getData = async (username: string, startDate?: string, endDate?: string): Promise<Data> => {
  const beersResponse = await fetch(
    `http://localhost:8080/beer/${username}?startDate=${startDate}&endDate=${endDate}`,
    { cache: 'no-store' }
  )
  const beersData = formatBeerData(await beersResponse.json())
  return beersData
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
