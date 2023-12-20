'use client';

import { useEffect, useState } from 'react';

import { DisplayCard } from '@/components/cards/DisplayCard';
import CityHeader from '@/components/texts/CityHeader';
import { Flex, Heading } from '@radix-ui/themes';
import FilterButtons from './buttons/FilterButtons';

export default function DisplayCityPage({ workSpacesData }: any) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [workSpaceState, setWorkSpaceState] = useState(workSpacesData);

  useEffect(() => {
    const filteredWorkspace = workSpacesData?.filter((space: any) => {
      if (selectedFilter === 'all') return true;
      return space[`${selectedFilter}`];
    });
    setWorkSpaceState(filteredWorkspace);
  }, [selectedFilter, workSpacesData]);

  const city = workSpacesData?.[0]?.cityName;

  const amenitiesStats = workSpacesData.map((space: any) => ({
    id: space.id,
    pet_friendly: space.pet_friendly,
    opens_till_late: space.opens_till_late,
    has_wifi: space.has_wifi,
    has_socket: space.has_socket,
    has_shower: space.has_shower,
    has_meeting_room: space.has_meeting_room,
    has_phone_booth: space.has_phone_booth,
    has_locker: space.has_locker,
  }));

  const trueAmenitiesWithId = amenitiesStats.map((space: any) => {
    const trueAmenities = Object.keys(space).filter(
      (key: string) => space[key as keyof typeof space] === true
    );
    return { id: space.id, trueAmenities };
  });

  return (
    <>
      <Flex direction='column' gap='3' align='center'>
        <>
          <CityHeader data-testid='city-header' city={city} />
          <FilterButtons
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <Heading data-testid='city-workspaces' as='h2' size='5'>
            {workSpaceState?.length} Work Spaces
          </Heading>
          <div
            data-testid='place-card-container'
            className='flex gap-6 flex-col'
          >
            {workSpaceState?.map((space: any) => (
              <DisplayCard
                key={space.name}
                pageRoute={`places/${space.id}`}
                imageLink={space.image}
                placeName={space.name}
                flavourText={space.address}
                amenityList={
                  trueAmenitiesWithId.find(
                    (amenity: any) => amenity.id === space.id
                  ).trueAmenities
                }
              />
            ))}
          </div>
        </>
      </Flex>
    </>
  );
}
