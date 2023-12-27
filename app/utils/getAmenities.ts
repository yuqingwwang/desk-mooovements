import { Workspace } from '@/app/utils/types';

export default function getTrueAmenities(data: Workspace[]) {
  const amenitiesStats = data.map((space: any) => ({
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

  const trueAmenitiesWithId = amenitiesStats.map((space: any) => {
    const trueAmenities = Object.keys(space).filter(
      (key: string) => space[key as keyof typeof space] === true
    );
    return { id: space.id, trueAmenities };
  });

  return trueAmenitiesWithId;
}
