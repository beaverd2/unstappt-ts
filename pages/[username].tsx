import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect} from 'react'
import {Flex, Container} from '@chakra-ui/react'
import {createStandaloneToast} from '@chakra-ui/toast'
import {User} from 'components/user'
import {DrinkingPattern} from 'components/drinking-pattern'
import {TopBeers} from 'components/beers'
import {TopRegions} from 'components/regions'
import {TopStyles} from 'components/styles'
import {Statistics} from 'components/statistics'
import {DatePicker} from 'components/date-picker'
import {Activity} from 'components/activity'
import {SessionsTable} from 'components/sessions-table'
import {CheckinsTable} from 'components/checkins-table'
import {TopCountries} from 'components/countries'
import {TopBreweries} from 'components/breweries'
import {useRouter} from 'next/router'
import {useFetch} from 'shared/api'

const Notification = (message: string) => {
  const toast = createStandaloneToast({})
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 3000,
    position: 'top',
    isClosable: true,
  })
}

const Home: NextPage = () => {
  const [data, user, startDate, endDate, isLoading, error, fetchBeersForRange] = useFetch()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      Notification(error)
    }
  }, [error])

  return (
    <>
      <Head>
        <title>{router.query.username} on Unstappt </title>
      </Head>
      <Container maxW={['container.sm', 'container.md', 'container.lg']}>
        <User isLoading={isLoading} user={user} />
        <DatePicker
          fetchBeersForRange={fetchBeersForRange}
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
        />
        <Statistics beers={data.beers} isLoading={isLoading} />
        <Activity isLoading={isLoading} beers={data.beers} startDate={startDate} endDate={endDate} />
        <Flex flexWrap="wrap" justifyContent="space-between" gridColumnGap={2} alignItems="flex-start">
          <TopBeers beers={data.beers} isLoading={isLoading} />
          <TopBreweries breweries={data.breweries} isLoading={isLoading} />
          <TopStyles styles={data.styles} isLoading={isLoading} />
          <TopCountries countries={data.countries} isLoading={isLoading} />
          <TopRegions regions={data.regions} isLoading={isLoading} />
        </Flex>
        <DrinkingPattern beers={data.beers} isLoading={isLoading} />
        <SessionsTable beers={data.beers} isLoading={isLoading} />
        <CheckinsTable beers={data.beers} isLoading={isLoading} username={user.username} />
      </Container>
    </>
  )
}

export default Home
