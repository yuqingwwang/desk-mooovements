import SeeMore from '@/app/components/SeeMore';
import { PageByIDParams, Workspace } from '@/app/utils/types';
import { SupabaseCall } from '@/utils/supabaseCall';
import Link from 'next/link';
import Navbar from '@/app/components/NavBar';

export default async function WorkSpaces({ params }: PageByIDParams) {
  let place: Workspace[] | null = null;
  const id = params.id;
  place = await SupabaseCall(
    'work_spaces',
    'id,name,address,image,cities ( name ),pet_friendly,opens_till_late,has_wifi,has_socket,has_shower,has_meeting_room,has_phone_booth,has_locker',
    'id',
    id
  );
  return (
    <>
      <Navbar />
      <div>
        <p>{JSON.stringify({ params })}</p>
        {place && place.length > 0 ? (
          <>
            {/* Uncomment when we have images
         <Image
           src={place[0].image}
           alt="image of the workspace"
           width={200}
           height={200}
           priority
         />
         */}
            <p data-testid='place-name'>Name: {place[0].name}</p>
            <p>Address: {place[0].address}</p>
            {/* <p>City: {place[0].cities.name}</p> */}
            <SeeMore place={place} />
            <Link href={'/'}>
              <div className='m-3'>
                <button className='inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white'>
                  <span className='mx-auto'>Home</span>
                </button>
              </div>
            </Link>
          </>
        ) : (
          <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
        )}
      </div>
    </>
  );
}
