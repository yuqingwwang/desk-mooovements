import SeeMore from '@/app/components/SeeMore';
import { PageByIDParams, Workspace } from '@/app/utils/types';
import { SupabaseCall } from '@/utils/supabaseCall';
import Link from 'next/link';
import Navbar from '@/app/components/NavBar';
import AddToWishList from '@/app/components/AddToWishlist';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../database.types';
import { MapView } from '@/app/components/MapView';
import { Heading, Text } from '@radix-ui/themes';

export default async function WorkSpaces({ params }: PageByIDParams) {
  let place: Workspace[] | null = null;
  const id = params.id;
  place = await SupabaseCall(
    'work_spaces',
    'id, name, address, image, \
    cities (name), pet_friendly, \
    opens_till_late, has_wifi, has_socket, \
    has_shower, has_meeting_room, has_phone_booth, has_locker, \
    coordinates',
    'id',
    id
  );
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div>
        {place && place.length > 0 ? (
          <>
            <div>
              <Heading data-testid='place-name'> {place[0].name}</Heading>
              <Text>Address: {place[0].address}</Text>
            </div>
            <MapView coordinates={place && place[0].coordinates} />
            <SeeMore place={place} />
            {/* <Link href={'/'}>
              <AddToWishList id={parseInt(id)} user={user && user.id} />
              <div className='m-3'>
                <button className='inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white'>
                  <span className='mx-auto'>Home</span>
                </button>
              </div>
            </Link> */}
          </>
        ) : (
          <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
        )}
      </div>
      <Navbar user={user && user.id} />
    </>
  );
}
