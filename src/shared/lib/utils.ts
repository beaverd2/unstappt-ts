import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BeerData, UserData } from '../types/requests'
import { Data, User } from '../types/data'

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

const addRatingInfo = (obj: any, rating: number) => {
  if (obj === undefined) {
    return {
      sumRating: rating,
      avgRating: rating,
      count: 1,
    }
  } else {
    obj.count++
    obj.sumRating += rating
    obj.avgRating = obj.sumRating / obj.count
    return obj
  }
}

const addRegion = (obj: any, beer: BeerData) => {
  const name = beer.brewery.location.brewery_state === '' ? 'Other' : beer.brewery.location.brewery_state
  const rating = beer.rating_score
  obj[name] = {
    name: name,
    ...addRatingInfo(obj[name], rating),
  }
}

const addCountry = (obj: any, beer: BeerData) => {
  const name = beer.brewery.country_name
  const rating = beer.rating_score
  obj[name] = {
    name: name,
    ...addRatingInfo(obj[name], rating),
  }
}

const addBrewery = (obj: any, beer: BeerData) => {
  const name = beer.brewery.brewery_name
  const country = beer.brewery.country_name
  const img = beer.brewery.brewery_label
  const url = 'https://untappd.com' + beer.brewery.brewery_page_url
  const rating = beer.rating_score
  obj[name] = {
    name: name,
    country: country,
    img: img,
    url: url,
    ...addRatingInfo(obj[name], rating),
  }
}

const addStyle = (obj: any, beer: BeerData) => {
  const name = beer.beer.beer_style
  const rating = beer.rating_score
  obj[name] = {
    name: name,
    ...addRatingInfo(obj[name], rating),
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
    date: beer.recent_created_at,
  }
}

export const formatBeerData = (beersData?: BeerData[]): Data => {
  if (!beersData)
    return {
      beers: [],
      breweries: [],
      styles: [],
      countries: [],
      regions: [],
    }

  const breweries: any = {}
  const styles: any = {}
  const countries: any = {}
  const regions: any = {}

  for (const beer of beersData) {
    addBrewery(breweries, beer)
    addStyle(styles, beer)
    addCountry(countries, beer)
    addRegion(regions, beer)
  }

  return {
    beers: beersData.map(mapBeer),
    breweries: Object.values(breweries),
    styles: Object.values(styles),
    countries: Object.values(countries),
    regions: Object.values(regions),
  }
}

export const isUser = (obj: User | {}): obj is User => {
  return (
    (obj as User).username !== undefined &&
    (obj as User).firstName !== undefined &&
    (obj as User).lastName !== undefined &&
    (obj as User).checkins !== undefined &&
    (obj as User).beers !== undefined &&
    (obj as User).avatar !== undefined &&
    (obj as User).joinedDate !== undefined
  )
}
