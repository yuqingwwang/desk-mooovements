import { MapView } from '@/app/components/MapView';
import Navbar from '@/app/components/NavBar';
import AddToWishList from '@/app/components/buttons/AddToWishlist';
import { DisplayCard } from '@/app/components/cards/DisplayCard';
import allData from '@/app/utils/getPlace';
import { PageByIDParams, Workspace } from '@/app/utils/types';
import { Database } from '@/database.types';
import { Heading } from '@radix-ui/themes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function fetchData(id: string) {
  const result = (await allData(id)) as any;
  return result;
}

export default async function WorkSpaces({ params }: PageByIDParams) {
  const {
    place,
    trueAmenitiesWithId,
  }: { place: Workspace[]; trueAmenitiesWithId: any } = await fetchData(
    params.id
  );

  if (place?.length === 0) notFound();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className='mt-7 flex flex-col items-center'>
        <Heading as='h1' size='8' className='pb-4'>
          Workplace
        </Heading>
        {place?.length > 0 ? (
          <>
            <DisplayCard
              imageLink={place[0].image}
              placeName={place[0].name}
              flavourText={place[0].address}
              amenityList={`${trueAmenitiesWithId?.find(
                (amenity: any) =>
                  amenity.id === (place[0].id as unknown as string)
              )?.amenities}`}
            />

            <div className='mb-3 mt-5 flex space-x-10'>
              <AddToWishList id={parseInt(params.id)} user={user && user.id} />
            </div>
            <MapView coordinates={place && place[0].coordinates} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Navbar user={user && user.id} />
    </>
  );
}
