import { WorkSpaces } from '@/app/lib/allTypes';
import { db } from '@/app/lib/vercel-storage';

// get workspaces in a city
export async function getSpacesInCity(
  cityNumber: string
): Promise<WorkSpaces[]> {
  // retrieve all spaces in a city as an array
  const res = await db
    .selectFrom('work_spaces')
    .innerJoin('cities', 'work_spaces.city', 'cities.id')
    .select([
      'work_spaces.id',
      'work_spaces.name',
      'work_spaces.image',
      'address',
      'city',
      'has_locker',
      'has_meeting_room',
      'has_phone_booth',
      'has_shower',
      'has_socket',
      'has_wifi',
      'opens_till_late',
      'pet_friendly',
      'created_at',
      'created_by',
      'cities.name as cityName',
    ])
    .where('cities.id', '=', Number(cityNumber))
    .execute();

  return res;
}
