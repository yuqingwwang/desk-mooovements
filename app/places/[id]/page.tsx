// import Navbar from '@/components/NavBar';
// import AddToWishList from '@/components/buttons/AddToWishlist';
// import getUser from 'app/utils/getUser';
import { PageByIDParams } from '@/app/utils/types';
import { DisplayCard } from '@/components/cards/DisplayCard';
import { Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import { getSpaceById } from '@/app/lib/getSpaceById';
import getTrueAmenities from '@/app/utils/getAmenities';

export const revalidate = 0;

export default async function WorkSpaces({ params }: PageByIDParams) {
  const selectedWorkSpace = await getSpaceById(params.id);

  const trueAmenitiesWithId = getTrueAmenities(selectedWorkSpace);

  if (selectedWorkSpace?.length === 0) notFound();

  // const user = await getUser();

  return (
    <>
      <div className='mt-7 flex flex-col items-center'>
        <Heading as='h1' size='8' className='pb-4'>
          Workplace
        </Heading>
        {selectedWorkSpace?.length > 0 ? (
          <>
            <DisplayCard
              imageLink={selectedWorkSpace[0].image}
              placeName={selectedWorkSpace[0].name}
              flavourText={selectedWorkSpace[0].address}
              amenityList={`${trueAmenitiesWithId?.find(
                (amenity: any) => Number(amenity.id) === selectedWorkSpace[0].id
              )?.trueAmenities}`}
            />

            {/* <div className='mb-3 mt-5 flex space-x-10'>
              <AddToWishList id={parseInt(params.id)} user={user && user.id} />
            </div> */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <Navbar user={user && user.id} /> */}
    </>
  );
}
