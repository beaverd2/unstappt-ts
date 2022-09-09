import axios from 'axios'
import {format, subDays} from 'date-fns'
import {useRouter} from 'next/router'
import {useCallback, useEffect, useState} from 'react'
import {BeerData, UserData} from 'shared/types/requests'
import {Data, User} from 'shared/types/data'

type ErrorMessage = {
  error: string
}

export const useFetch = (): [
  data: Data,
  user: User,
  startDate: Date,
  endDate: Date,
  isLoading: boolean,
  error: string | null,
  fetchBeersForRange: (startDate: Date, endDate: Date) => Promise<void>
] => {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    checkins: 0,
    beers: 0,
    avatar: '',
    joinedDate: '',
  })
  const [data, setData] = useState<any>({
    beers: [],
    breweries: [],
    styles: [],
    countries: [],
    regions: [],
  })
  const [error, setError] = useState<string | null>(null)
  const today = new Date()
  const weekAgo = subDays(today, 7)

  const [startDate, setStartDate] = useState(weekAgo)
  const [endDate, setEndDate] = useState(today)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const fetchAll = useCallback(
    async (username: string) => {
      setIsLoading(true)

      const userData = await fetchUser(username)
      if ('error' in userData) {
        setError(userData.error)
        router.push({
          pathname: `/`,
        })
        setIsLoading(false)
        return
      }

      const allBeersData = await fetchBeers(
        `${username}?start_date=${format(weekAgo, 'yyyy-MM-dd')}&end_date=${format(today, 'yyyy-MM-dd')}`
      )
      if ('error' in allBeersData) {
        setError(allBeersData.error)
        setIsLoading(false)
        return
      }
      const user = mapUser(userData)
      const data = getAllData(allBeersData)
      setStartDate(weekAgo)
      setEndDate(today)
      setUser(user)
      setData(data)
      setIsLoading(false)
    },
    [router]
  )

  const fetchBeersForRange = async (startDate: Date, endDate: Date) => {
    if (!user) {
      setError('no user')
      return
    }

    setIsLoading(true)
    const allBeersData = await fetchBeers(
      `${user.username}?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
    )

    if ('error' in allBeersData) {
      setError(allBeersData.error)
      setIsLoading(false)
      return
    }

    setStartDate(startDate)
    setEndDate(endDate)
    const data = getAllData(allBeersData)
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (typeof router.query.username === 'string') {
      fetchAll(router.query.username)
    }
  }, [router.query.username, fetchAll])
  return [data, user, startDate, endDate, isLoading, error, fetchBeersForRange]
}

const fetchBeers = async (url: string): Promise<BeerData[] | ErrorMessage> => {
  const response = await axios.get(`api/beer/${url}`)
  const data = response.data
  if ('error' in data) return data
  const beers = data.beers.items
  if (data.total_count > 50) {
    let endpoints = [...Array(Math.floor(data.total_count / 50)).keys()].map(
      (key) => 'api/beer/' + url + '&offset=' + (key + 1) * 50
    )
    const allResponses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
    const allBeers = allResponses.map((response) => response.data.beers.items).reduce((a, b) => a.concat(b), [])
    return beers.concat(allBeers)
  }
  return beers
}

const fetchUser = async (username: string): Promise<UserData | ErrorMessage> => {
  const response = await axios.get(`api/user/${username}`)
  return response.data
}

const getAllData = (beersData: BeerData[]): Data => {
  let beers: any[] = []
  const breweries = {}
  const styles = {}
  const countries = {}
  const regions = {}
  for (const beer of beersData) {
    beers = [...beers, mapBeer(beer)]
    addBrewery(breweries, beer)
    addStyle(styles, beer)
    addCountry(countries, beer)
    addRegion(regions, beer)
  }
  return {
    beers,
    breweries: Object.values(breweries),
    styles: Object.values(styles),
    countries: Object.values(countries),
    regions: Object.values(regions),
  }
}

const addRegion = (obj: any, beer: BeerData) => {
  const name = beer.brewery.location.brewery_state === '' ? 'Other' : beer.brewery.location.brewery_state
  const rating = beer.rating_score
  if (obj[name] === undefined)
    obj[name] = {
      name: name,
      sumRating: rating,
      avgRating: rating,
      count: 1,
    }
  else {
    obj[name].count++
    obj[name].sumRating += rating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
}

const addCountry = (obj: any, beer: BeerData) => {
  const name = beer.brewery.country_name
  const rating = beer.rating_score
  if (obj[name] === undefined)
    obj[name] = {
      name: name,
      sumRating: rating,
      avgRating: rating,
      count: 1,
    }
  else {
    obj[name].count++
    obj[name].sumRating += rating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
}

const addBrewery = (obj: any, beer: BeerData) => {
  const name = beer.brewery.brewery_name
  const country = beer.brewery.country_name
  const img = beer.brewery.brewery_label
  const url = 'https://untappd.com' + beer.brewery.brewery_page_url
  const rating = beer.rating_score
  if (obj[name] === undefined)
    obj[name] = {
      name: name,
      country: country,
      img: img,
      url: url,
      sumRating: rating,
      avgRating: rating,
      count: 1,
    }
  else {
    obj[name].count++
    obj[name].sumRating += rating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
}

const addStyle = (obj: any, beer: BeerData) => {
  const name = beer.beer.beer_style
  const rating = beer.rating_score
  if (obj[name] === undefined)
    obj[name] = {
      name: name,
      sumRating: rating,
      avgRating: rating,
      count: 1,
    }
  else {
    obj[name].count++
    obj[name].sumRating += rating
    obj[name].avgRating = obj[name].sumRating / obj[name].count
  }
}

const mapBeer = (beer: BeerData) => {
  return {
    id: beer.recent_checkin_id,
    name: beer.beer.beer_name,
    brewery: beer.brewery.brewery_name,
    country: beer.brewery.country_name,
    style: beer.beer.beer_style,
    img: beer.beer.beer_label,
    userRating: beer.rating_score,
    globalRating: Number(beer.beer.rating_score.toPrecision(3)),
    count: beer.count,
    url: 'https://untappd.com/b/' + beer.brewery.brewery_slug + '/' + beer.beer.bid,
    date: new Date(beer.recent_created_at),
  }
}

const mapUser = (userData: UserData) => ({
  username: userData.user_name,
  firstName: userData.first_name,
  lastName: userData.last_name,
  checkins: userData.stats.total_checkins,
  beers: userData.stats.total_beers,
  avatar: userData.user_avatar,
  joinedDate: userData.date_joined,
})
