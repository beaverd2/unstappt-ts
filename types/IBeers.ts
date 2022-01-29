export interface IBeers {
  first_checkin_id: number;
  first_created_at: string;
  recent_checkin_id: number;
  recent_created_at: string;
  recent_created_at_timezone: string;
  rating_score: number;
  user_auth_rating_score: number;
  first_had: string;
  count: number;
  beer: Beer;
  brewery: Brewery;
}

export interface Beer {
  bid: number;
  beer_name: string;
  beer_label: string;
  beer_abv: number;
  beer_ibu: number;
  beer_slug: string;
  beer_style: string;
  beer_description: string;
  created_at: string;
  rating_score: number;
  rating_count: number;
  has_had: boolean;
}

export interface Brewery {
  brewery_id: number;
  brewery_name: string;
  brewery_slug: string;
  brewery_page_url: string;
  brewery_type: string;
  brewery_label: string;
  country_name: string;
  contact: Contact;
  location: Location;
  brewery_active: number;
}

export interface Contact {
  twitter: string;
  facebook: string;
  instagram: string;
  url: string;
}

export interface Location {
  brewery_city: string;
  brewery_state: string;
  lat: number;
  lng: number;
}
