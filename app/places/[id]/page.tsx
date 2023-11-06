import { SupabaseCall } from '@/utils/supabaseCall';

type Place = {
  id: number;
  created_at: string;
  created_by: number;
  name: string;
  address: string;
  image: string;
  city: number;
  pet_friendly: boolean;
  opens_till_late: boolean;
  has_wifi: boolean;
  has_socket: boolean;
  has_shower: boolean;
  has_meeting_room: boolean;
  has_phone_booth: boolean;
  has_locker: boolean;
};
export default async function WorkSpaces({ params }) {
  let place: Place[] | null = null;
  const id = params.id;
  place = await SupabaseCall(
    'work_spaces',
    'id,name,address,image,city',
    'id',
    id
  );

  return <p>{JSON.stringify(place)}</p>;
}
