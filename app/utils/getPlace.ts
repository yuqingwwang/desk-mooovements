import { SupabaseCall } from '@/app/utils/supabaseCall';
import { Amenities, Workspace } from '@/app/utils/types';

export default async function getPlace(id: string) {
  const place: Workspace[] =
    (await SupabaseCall('work_spaces', '*', 'id', id)) || [];

  const amenitiesStats: Amenities[] | undefined = place?.map((space) => ({
    id: space.id,
    pet_friendly: space.pet_friendly,
    opens_till_late: space.opens_till_late,
    has_wifi: space.has_wifi,
    has_socket: space.has_socket,
    has_shower: space.has_shower,
    has_meeting_room: space.has_meeting_room,
    has_phone_booth: space.has_phone_booth,
    has_locker: space.has_locker,
  }));

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

  return {
    trueAmenitiesWithId,
    place,
  };
}
