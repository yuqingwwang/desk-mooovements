import { SupabaseCall } from '@/app/utils/supabaseCall';
import {
  Amenities,
  City,
  CityPage,
  WorkPlaceWithCity,
  WorkspaceWithReviews,
} from '@/app/utils/types';

export default async function getAmenities(id: string) {
  let city: CityPage[] | null = null;

  city = await SupabaseCall(
    'cities',
    'id, name, country, work_spaces(*)',
    'id',
    id
  );

  const actualWorkSpacesData: WorkPlaceWithCity[] =
    (await SupabaseCall('work_spaces', '*, cities(id)', 'city', id)) || [];

  if (city?.length === 0)
    return {
      city: false,
      actualWorkSpacesData: false,
      trueAmenitiesWithId: false,
    };

  const allSpacesWithReviews: WorkspaceWithReviews[] =
    (await SupabaseCall(
      'work_spaces',
      'id, name, address, image, city, reviews(count)',
      '',
      ''
    )) || [];

  const allCities: City[] =
    (await SupabaseCall(
      'cities',
      'id, name, country, work_spaces(count), image',
      '',
      ''
    )) || [];

  const amenitiesStats: Amenities[] | undefined = actualWorkSpacesData?.map(
    (space) => ({
      id: space.id,
      pet_friendly: space.pet_friendly,
      opens_till_late: space.opens_till_late,
      has_wifi: space.has_wifi,
      has_socket: space.has_socket,
      has_shower: space.has_shower,
      has_meeting_room: space.has_meeting_room,
      has_phone_booth: space.has_phone_booth,
      has_locker: space.has_locker,
    })
  );

  const trueAmenitiesWithId: { id: string; amenities: string[] }[] | undefined =
    amenitiesStats?.map((amenity: any) => {
      const amenities = Object.keys(amenity).filter(
        (key) => amenity[key] === true
      );
      return {
        id: amenity.id,
        amenities: amenities as string[],
      };
    });

  const place = await SupabaseCall(
    'work_spaces',
    'id, name, address, image, \
    cities (name), pet_friendly, \
    opens_till_late, has_wifi, has_socket, \
    has_shower, has_meeting_room, has_phone_booth, has_locker, \
    coordinates',
    'id',
    id
  );

  return {
    city,
    actualWorkSpacesData,
    trueAmenitiesWithId,
    allSpacesWithReviews,
    allCities,
    place,
  };
}
