import { CityPage, PageByIDParams, Amenities } from '@/app/utils/types';
import { SupabaseCall } from '@/utils/supabaseCall';
import Navbar from '@/app/components/NavBar';
// import Image from 'next/image';
import { Heading, Text, Button, Flex, Box } from '@radix-ui/themes';
import { useState } from 'react';
import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function cities({ params }: PageByIDParams) {
  let city: CityPage[] | null = null;

  city = await SupabaseCall(
    'cities',
    'id, name, country, work_spaces(*)',
    'id',
    params.id
  );

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const workSpacesData = city && city[0]['work_spaces'];
  const spaceNames =
    workSpacesData && workSpacesData.map((space) => space.name);
  console.log(city && city[0]);
  // console.log(workSpacesData)

  const amenitiesStats: Amenities[] | undefined = workSpacesData?.map(
    (space) => ({
      id: space.id,
      pet_friendly: space.pet_friendly,
      opens_till_late: space.opens_till_late,
      has_wifi: space.has_wifi,
      has_socket: space.has_socket,
      has_shower: space.has_shower,
      has_meeting_room: space.has_meeting_room,
      has_phone_booth: space.has_phone_booth,
      has_locker: space.has_locker,
    })
  );

  // const trueAmenities: string[][] | undefined = amenitiesStats?.map((amenity) =>
  // Object.keys(amenity).filter((key) => amenity[key] === true))

  const trueAmenitiesWithId: { id: string; amenities: string[] }[] | undefined =
    amenitiesStats?.map((amenity: any) => {
      const amenities = Object.keys(amenity).filter(
        (key) => amenity[key] === true
      );
      return {
        id: amenity.id,
        amenities: amenities as string[],
      };
    });

  console.log(trueAmenitiesWithId);
  return (
    <>
      <Flex direction='column' gap='3'>
        {city && city.length > 0 ? (
          <>
            <Box width='auto' height='auto' bottom='50%'>
              <Heading data-testid='city-name' as='h1' size='8'>
                {city[0].name}
              </Heading>
              <Text as='p' size='4'>
                Country: {city[0].country}
              </Text>
              {/* <Image
            src={city[0].image}
            alt="image of the workspace"
            width={200}
            height={200}
            priority
          /> */}
            </Box>
            <Heading as='h2' size='5'>
              {workSpacesData && workSpacesData.length} Work Spaces
            </Heading>
            {workSpacesData &&
              workSpacesData.map((space) => (
                <>
                  <DisplayPlaceCard
                    key={space.name}
                    pageRoute={`places/${space.id}`}
                    imageLink={space.image}
                    placeName={space.name}
                    // flavourText={space.address}
                    flavourText={`${trueAmenitiesWithId?.find(
                      (amenity) =>
                        amenity.id === (space.id as unknown as string)
                    )?.amenities}`}
                  />
                </>
              ))}
          </>
        ) : (
          <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
        )}
      </Flex>
      <Navbar user={user && user.id} />
    </>
  );
}
