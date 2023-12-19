'use client';

import { useEffect, useState } from 'react';

import { DisplayCard } from '@/components/cards/DisplayCard';
import CityHeader from '@/components/texts/CityHeader';
import { Flex, Heading } from '@radix-ui/themes';
import FilterButtons from './buttons/FilterButtons';

export default function DisplayCityPage({
  city,
  actualWorkSpacesData,
  trueAmenitiesWithId,
}: any) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [workSpaceState, setWorkSpaceState] = useState(actualWorkSpacesData);
  useEffect(() => {
    const filteredWorkspace = actualWorkSpacesData?.filter((space: any) => {
      if (selectedFilter === 'all') return true;
      return space[`${selectedFilter}`];
    });
    setWorkSpaceState(filteredWorkspace);
  }, [selectedFilter, actualWorkSpacesData]);

  return (
    <>
      <Flex direction='column' gap='3' align='center'>
        {city?.length > 0 ? (
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
                  amenityList={`${trueAmenitiesWithId?.find(
                    (amenity: any) => Number(amenity.id) === space.id
                  )?.amenities}`}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Flex>
    </>
  );
}
