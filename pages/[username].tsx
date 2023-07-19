import Head from 'next/head'
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
import { useUserPage } from 'shared/lib/use-user-page'

const UserPage = () => {
  const { title, userLoading, beersLoading, user, beers, range, handleRange } = useUserPage()
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
