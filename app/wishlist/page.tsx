import Navbar from '@/components/NavBar';
import { SupabaseCall } from '@/app/utils/supabaseCall';
import { Profile, Workspace } from '@/app/utils/types';
import { Database } from '@/database.types';
import { Heading, Text } from '@radix-ui/themes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DisplayWishlistPlaces from '../../components/DisplayWishlistPlaces';

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

  return user ? (
    <div>
      <Heading as='h1' align='center'>
        Welcome to your wishlist!
      </Heading>
      <DisplayWishlistPlaces
        places={places}
        wishlist={wishlistArray && wishlistArray[0].wish_list}
        wishListArr={wishlistArray}
        user={user?.id}
      />
      <Navbar user={user && user.id} />
    </div>
  ) : (
    <div>
      <Text size='7'>Log in to see your wish list</Text>
      <Navbar user={null} />
    </div>
  );
}
