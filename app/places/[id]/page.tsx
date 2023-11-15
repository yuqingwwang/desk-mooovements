import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';
import Navbar from '@/app/components/NavBar';
import AddToWishList from '@/app/components/detailPageComponents/AddToWishlist';
import { MapView } from '@/app/components/detailPageComponents/MapView';
import SeeMore from '@/app/components/detailPageComponents/SeeMore';
import { PageByIDParams, Workspace } from '@/app/utils/types';
import { SupabaseCall } from '@/utils/supabaseCall';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Database } from '../../../database.types';

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
      <div className='mt-7'>
        {place && place.length > 0 ? (
          <>
            <DisplayPlaceCard
              imageLink={place[0].image}
              placeName={place[0].name}
              flavourText={place[0].address}
            />

            <div className='mb-3 mt-5 flex space-x-10'>
              <SeeMore place={place} />

              <Link href={'/'}>
                <AddToWishList id={parseInt(id)} user={user && user.id} />
              </Link>
            </div>
            <MapView coordinates={place && place[0].coordinates} />
          </>
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
      <Navbar user={user && user.id} />
    </>
  );
}
