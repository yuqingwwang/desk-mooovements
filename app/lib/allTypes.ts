export type Cities = {
  country: string | null;
  id: number;
  image: string | null;
  name: string | null;
  count?: number | null;
};

export type WorkSpaces = {
  [x: string]: any;
  address: string | null;
  city: number | null;
  created_at: string | null;
  created_by: string | null;
  has_locker: boolean | null;
  has_meeting_room: boolean | null;
  has_phone_booth: boolean | null;
  has_shower: boolean | null;
  has_socket: boolean | null;
  has_wifi: boolean | null;
  id: number;
  image: string | null;
  name: string | null;
  opens_till_late: boolean | null;
  pet_friendly: boolean | null;
  cityName?: string | null;
  count?: string | null;
};

export type Profiles = {
  amenity_preference: string | null;
  created_at: string;
  id: string;
  social_preference: string | null;
  wish_list: number[] | null;
};

export type Reviews = {
  comments: string | null;
  food_rating: number | null;
  id: number;
  place_id: number | null;
  user_id: string | null;
  vibe_rating: number | null;
};
