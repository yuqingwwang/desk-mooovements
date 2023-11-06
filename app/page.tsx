import { SupabaseCall } from "@/utils/supabaseCall";

type City = {
  id: number;
  name: string;
  country: string;
};
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

export default async function Home() {
  let cities: City[] | null = null;
  let places: Place[] | null = null;
  cities = await SupabaseCall("cities", "id,name,country");

  places = await SupabaseCall("work_spaces", "id,name,address,image,city");
  return (
    <main className="bg-black">
      <h1>Welcome to desk-mooovements!</h1>
      {/* {fetchError && <p>{fetchError}</p>} */}
      {cities?.map((city) => (
        <p key={city.name}>{city.name}</p>
      ))}
      {places?.map((place) => (
        <p key={place.name}>{place.name}</p>
      ))}
    </main>
  );
}
