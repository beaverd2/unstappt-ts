import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BeerData, UserData } from '@/shared/types/requests'
import { Beer, Brewery, Country, Data, Region, Style } from '@/shared/types/data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapUserDataToUser = (userData?: UserData) => {
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

export const formatBeerData = (beersData: BeerData[] = []): Data => {
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
