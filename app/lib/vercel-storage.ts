// import { Generated, ColumnType } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'

// define types
type Database = {
    cities: Cities,
    profiles: Profiles,
    reviews: Reviews,
    work_spaces: WorkSpaces
}

type Cities = {
  country: string | null;
  id: number;
  image: string | null;
  name: string | null;
  count?: number | null;
}


type Profiles = {
  amenity_preference: string | null;
  created_at: string;
  id: string;
  social_preference: string | null;
  wish_list: number[] | null;
}

type Reviews = {
  comments: string | null;
  food_rating: number | null;
  id: number;
  place_id: number | null;
  user_id: string | null;
  vibe_rating: number | null;
}

type WorkSpaces = {
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
}


const db = createKysely<Database>()


export async function getCities(): Promise<Cities[]> {

  const res = await db
      .selectFrom('cities').select(['id', 'name', 'image', 'country'])
      .execute()

  return res
}

export async function getSpaces(): Promise <WorkSpaces[]>{

  const res = await db
      .selectFrom('work_spaces')
      .innerJoin('cities', 'work_spaces.city', 'cities.id')
      .select([
        'work_spaces.id', 'work_spaces.name',
        'work_spaces.image',
        'address', 'city',
        'has_locker', 'has_meeting_room', 'has_phone_booth',
        'has_shower', 'has_socket', 'has_wifi', 'opens_till_late',
        'pet_friendly', 'created_at', 'created_by', 'cities.name as cityName'
      ])
      .execute()

  return res
}

// get number of spaces in each city
export async function getSpacesCount(cityNumber: number): Promise <{count: string | null }>{

  const res = await db
      .selectFrom('work_spaces')
      .innerJoin('cities', 'work_spaces.city', 'cities.id')
      .select(({ fn }) => [
        fn.count<number>('work_spaces.id').as('count')
      ])
      .groupBy('cities.name')
      .where('cities.id', '=', cityNumber)
      .execute()

  if (res.length === 0) {
    return {count: '0'}
  }

  return { count: res[0].count.toString() }
}
