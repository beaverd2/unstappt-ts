export interface Stats {
  total_badges: number;
  total_friends: number;
  total_checkins: number;
  total_beers: number;
  total_created_beers: number;
  total_followings: number;
  total_photos: number;
}

export interface IUser {
  uid: number;
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  user_avatar: string;
  user_avatar_hd: string;
  user_cover_photo: string;
  user_cover_photo_offset: number;
  is_private: number;
  rating_bump: number;
  location: string;
  url: string;
  bio: string;
  is_supporter: number;
  is_moderator: number;
  relationship: null;
  block_status: string;
  mute_status: string;
  untappd_url: string;
  account_type: string;
  stats: Stats;
}
