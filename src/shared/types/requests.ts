export type Beer = {
  bid: number
  beer_name: string
  beer_label: string
  beer_abv: number
  beer_ibu: number
  beer_slug: string
  beer_style: string
  beer_description: string
  created_at: string
  rating_score: number
  rating_count: number
  has_had: boolean
}

export type Brewery = {
  brewery_id: number
  brewery_name: string
  brewery_slug: string
  brewery_page_url: string
  brewery_type: string
  brewery_label: string
  country_name: string
  contact: Contact
  location: Location
  brewery_active: number
}

export type Contact = {
  twitter: string
  facebook: string
  instagram: string
  url: string
}

export type Location = {
  brewery_city: string
  brewery_state: string
  lat: number
  lng: number
}

export type BeerData = {
  first_checkin_id: number
  first_created_at: string
  recent_checkin_id: number
  recent_created_at: string
  recent_created_at_timezone: string
  rating_score: number
  user_auth_rating_score: number
  first_had: string
  count: number
  beer: Beer
  brewery: Brewery
}

export type Stats = {
  total_badges: number
  total_friends: number
  total_checkins: number
  total_beers: number
  total_created_beers: number
  total_followings: number
  total_photos: number
}

export type UserData = {
  uid: number
  id: number
  user_name: string
  first_name: string
  last_name: string
  user_avatar: string
  user_avatar_hd: string
  user_cover_photo: string
  user_cover_photo_offset: number
  is_private: number
  rating_bump: number
  location: string
  url: string
  bio: string
  is_supporter: number
  is_moderator: number
  relationship: null
  block_status: string
  mute_status: string
  untappd_url: string
  account_type: string
  stats: Stats
  date_joined: string
}
