export type Beer = {
  id: number
  name: string
  brewery: string
  style: string
  country: string
  img: string
  userRating: number
  globalRating: number
  count: number
  url: string
  date: Date
}
export type Brewery = {
  name: string
  country: string
  img: string
  url: string
  sumRating: number
  avgRating: number
  count: number
}
export type Style = {
  name: string
  sumRating: number
  avgRating: number
  count: number
}
export type Country = {
  name: string
  sumRating: number
  avgRating: number
  count: number
}
export type Region = {
  name: string
  sumRating: number
  avgRating: number
  count: number
}
export type Data = {
  beers: Beer[]
  breweries: Brewery[]
  styles: Style[]
  countries: Country[]
  regions: Region[]
}
export type User = {
  username: string
  firstName: string
  lastName: string
  checkins: number
  beers: number
  avatar: string
  joinedDate: string
}
