enum AmenitiesEnum {
  quite = 'quite',
  access = 'access',
  social = 'social',
  yoga = 'yoga',
  pet = 'pet',
  shower = 'shower',
}

export type CreateAddWorkplaceForm = {
  name: string;
  image: string;
  city: number;
  address: string;
  rating: number;
  amenities: AmenitiesEnum;
  workplaceRating: number;
  foodRating: number;
  comments: string;
};
