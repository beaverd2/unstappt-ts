import { format, subDays } from 'date-fns'
import { BeerData, UserData } from '@/types/requests'
import { Beer, Brewery, Country, Data, Region, Style } from '@/types/data'

export const fetchUser = async (username: string) => {
  const queryParams = new URLSearchParams({
    client_id: process.env.CLIENT_ID ?? '',
    client_secret: process.env.CLIENT_SECRET ?? '',
  })

  const url = `${process.env.API_URL}/v4/user/info/${username}?${queryParams}`

  // const response = await fetch(url)
  const response = await fetch(url, { cache: 'no-store' })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.meta.error_detail)
  }
  return mapUserDataToUser(result.response.user)
}

const today = new Date()
const weekAgo = subDays(today, 7)

export type FetchBeers = {
  username: string
  startDate?: string
  endDate?: string
  offset?: number
}

export const fetchBeers = async ({ username, startDate, endDate, offset = 0 }: FetchBeers) => {
  const params = new URLSearchParams({
    limit: '50',
    start_date: startDate && endDate ? startDate : format(weekAgo, 'yyyy-MM-dd'),
    end_date: startDate && endDate ? endDate : format(today, 'yyyy-MM-dd'),
    offset: String(offset),
    client_id: process.env.CLIENT_ID ?? '',
    client_secret: process.env.CLIENT_SECRET ?? '',
  })

  const url = `${process.env.API_URL}/v4/user/beers/${username}?`

  try {
    // const response = await fetch(url + params)
    const response = await fetch(url + params, { cache: 'no-store' })
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.meta.error_detail)
    }

    const beers = result.response.beers.items

    if (result.response.total_count > 50) {
      const totalPages = Math.floor(result.response.total_count / 50)
      const urls = Array.from({ length: totalPages }, (_, index) => {
        params.set('offset', String((index + 1) * 50))
        return url + params
      })

      const allResponses = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      const allBeers = allResponses.map((response) => response.response.beers.items).flat()
      beers.push(...allBeers)
    }
    return formatBeerData(beers)
  } catch (error) {
    throw error
  }
}

const mapUserDataToUser = (userData?: UserData) => {
  return {
    username: userData?.user_name ?? '',
    firstName: userData?.first_name ?? '',
    lastName: userData?.last_name ?? '',
    checkins: userData?.stats.total_checkins ?? 0,
    beers: userData?.stats.total_beers ?? 0,
    avatar: userData?.user_avatar ?? '',
    joinedDate: userData?.date_joined ?? '',
  }
}

const formatBeerData = (beersData: BeerData[] = []): Data => {
  const breweries: { [key: string]: Brewery } = {}
  const styles: { [key: string]: Style } = {}
  const countries: { [key: string]: Country } = {}
  const regions: { [key: string]: Region } = {}

  beersData.forEach((beer) => {
    const { brewery_name, country_name, brewery_label, brewery_page_url, location } = beer.brewery
    const { beer_style, rating_score } = beer.beer
    const regionName = location.brewery_state || 'Other'

    addEntity(breweries, brewery_name, beer.rating_score, {
      country: country_name,
      img: brewery_label,
      url: `https://untappd.com${brewery_page_url}`,
    })
    addEntity(styles, beer_style, rating_score)
    addEntity(countries, country_name, rating_score)
    addEntity(regions, regionName, rating_score)
  })

  return {
    beers: beersData.map(mapBeer),
    breweries: Object.values(breweries),
    styles: Object.values(styles),
    countries: Object.values(countries),
    regions: Object.values(regions),
  }
}

type RatingInfo = {
  sumRating: number
  avgRating: number
  count: number
}

const updateRatingInfo = (obj: RatingInfo | undefined, rating: number): RatingInfo => {
  if (!obj) return { sumRating: rating, avgRating: rating, count: 1 }
  const sumRating = obj.sumRating + rating
  const count = obj.count + 1
  return { sumRating, avgRating: sumRating / count, count }
}

const addEntity = (obj: { [key: string]: any }, key: string, rating: number, additionalProps: any = {}) => {
  obj[key] = {
    ...updateRatingInfo(obj[key], rating),
    ...additionalProps,
    name: key,
  }
}

const mapBeer = (beer: BeerData): Beer => ({
  id: beer.recent_checkin_id,
  name: beer.beer.beer_name,
  brewery: beer.brewery.brewery_name,
  country: beer.brewery.country_name,
  style: beer.beer.beer_style,
  img: beer.beer.beer_label,
  userRating: beer.rating_score,
  globalRating: Number(beer.beer.rating_score.toPrecision(3)),
  count: beer.count,
  url: `https://untappd.com/b/${beer.brewery.brewery_slug}/${beer.beer.bid}`,
  date: beer.recent_created_at,
})
