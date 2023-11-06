

enum AmenitiesEnum {
  quite = "quite",
  access = "access",
  social = "social",
  yoga = 'yoga',
  pet = "pet",
  shower = "shower"
}

export type CreateAddWorkplaceForm = {
  name: string,
  city: string,
  rating: number,
  amenities: AmenitiesEnum,
  workplaceRating: number,
  foodRating: number,
  comments: string,
  }
