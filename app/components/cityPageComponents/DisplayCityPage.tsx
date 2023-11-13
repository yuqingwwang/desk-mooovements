import { Heading, Text, Flex, Box } from '@radix-ui/themes';
import { CityData } from '@/app/utils/types';
import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';

export default function DisplayCityPage({
  city,
  workSpacesData,
  trueAmenitiesWithId,
}: CityData) {
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
    </>
  );
}
