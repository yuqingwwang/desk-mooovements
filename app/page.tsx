import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './components/Carousel';

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

  cities = await SupabaseCall('cities', 'id,name,country, work_spaces(count)', '', '');

  places = await SupabaseCall(
    'work_spaces',
    'id,name,address,image,city',
    '',
    ''
  );
  return (
    <main>
      <h1>Welcome to desk-mooovements!</h1>
      {/* {fetchError && <p>{fetchError}</p>} */}
      <div
        id='popularCities'
        className='border-4 border-double border-yellow-500 flex justify-between flex-wrap'
      >
        <Carousel places = {places}/>
        <Carousel cities = {cities} />

       
        </div>
    </main>
  );
}

