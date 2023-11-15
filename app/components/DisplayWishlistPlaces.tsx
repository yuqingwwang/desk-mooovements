'use client';
import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';
import { Flex, Heading } from '@radix-ui/themes';
import { Amenities, WishlistDisplay } from '../utils/types';

export default function DisplayWishlistPlaces({
  places,
  wishlist,
}: WishlistDisplay) {
  const amenitiesStats: Amenities[] | undefined = places?.map((space) => ({
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
  const trueAmenitiesWithId: { id: string; amenities: string[] }[] | undefined =
    amenitiesStats?.map((amenity: any) => {
      const amenities = Object.keys(amenity).filter(
        (key) => amenity[key] === true
      );
      console.log(amenities);
      return {
        id: amenity.id,
        amenities: amenities as string[],
      };
    });

  if (wishlist === null) return <h1>Your wishlist is empty</h1>;

  return (
    <>
      <Flex direction='column' gap='3'>
        {places && places.length > 0 ? (
          <>
            <Heading as='h2' size='5'>
              {wishlist && wishlist.length} Work Spaces
            </Heading>
            {places &&
              wishlist &&
              places
                .filter((space) => wishlist.some((x) => x === space.id))
                .map((space) => (
                  <DisplayPlaceCard
                    key={space.name}
                    pageRoute={`places/${space.id}`}
                    imageLink={space.image}
                    placeName={space.name}
                    flavourText={space.address}
                    amenityList={`${trueAmenitiesWithId?.find(
                      (amenity) =>
                        amenity.id === (space.id as unknown as string)
                    )?.amenities}`}
                  />
                ))}
          </>
        ) : (
          <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
        )}
      </Flex>
    </>
  );
}
