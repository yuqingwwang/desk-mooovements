import supabase from "./config/supabaseclient";

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
  async function SupabaseCall(callFrom: string, selectThis: string) {
    const { data, error } = await supabase.from(callFrom).select(selectThis);
    if (error) {
      fetchError = `Could not fetch the ${callFrom}`;
      console.log(error);
      return null;
    }
    console.log({ tableName: callFrom, select: selectThis, data: data });
    return data as any[];
  }

  let fetchError: string | null = null;
  let cities: City[] | null = null;
  let places: Place[] | null = null;
  cities = await SupabaseCall("cities", "id,name,country");

  places = await SupabaseCall("work_spaces", "id,name,address,image,city");
  return (
    <main className="bg-black">
      <h1>Welcome to desk-mooovements!</h1>
      {fetchError && <p>{fetchError}</p>}
      {cities?.map((city) => (
        <p key={city.name}>{city.name}</p>
      ))}
      {places?.map((place) => (
        <p key={place.name}>{place.name}</p>
      ))}
    </main>
  );
}
