import { Workspace, Profile } from '@/app/utils/types';
import { SupabaseCall } from '@/utils/supabaseCall';
import Navbar from '@/app/components/NavBar';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import DisplayWishlistPlaces from '../components/DisplayWishlistPlaces';
import { Heading } from '@radix-ui/themes';

export default async function wishlist() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let wishlistArray: Profile[] | null = null;
  wishlistArray = await SupabaseCall('profiles', 'wish_list', 'id', user?.id);

  let places: Workspace[] | null = null;
  places = await SupabaseCall(
    'work_spaces',
    'id,name,address,image,cities ( name ),pet_friendly,opens_till_late,has_wifi,has_socket,has_shower,has_meeting_room,has_phone_booth,has_locker',
    '',
    ''
  );
  // console.log(places)

  return (
    <div>
      <Heading as='h1' align='center'>
        Welcome to your wishlist!
      </Heading>
      <DisplayWishlistPlaces
        places={places}
        wishlist={wishlistArray && wishlistArray[0].wish_list}
        wishListArr ={wishlistArray}
        user = {user}
      />
      <Navbar user={user && user.id} />
    </div>
  );
}
