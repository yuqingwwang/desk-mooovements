'use client';

import { DisplayCard } from '@/app/components/cards/DisplayCard';
import newClient from '@/app/config/supabaseclient';
import { Amenities, WishlistDisplay } from '@/app/utils/types';
import { Flex, Heading } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export default function DisplayWishlistPlaces({
  places,
  wishlist,
  wishListArr,
  user,
}: WishlistDisplay) {
  const [deleteFlag, setDeleteFlag] = useState(false);

  async function DeleteWorkPlace(valueToDelete: number) {
    const supabase = newClient();

    const updatedWishList =
      wishListArr &&
      wishListArr[0]['wish_list'] &&
      wishListArr[0]['wish_list'].filter((x) => x !== valueToDelete);

    const { data, error } = await supabase
      .from('profiles')
      .update({ wish_list: updatedWishList })
      .eq('id', user);

    if (error) {
      console.error('Error:', error.message);
    }

    setDeleteFlag(true);
  }

  useEffect(() => {
    if (deleteFlag) {
      window.location.reload();

      setDeleteFlag(false);
    }
  }, [deleteFlag]);

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
      return {
        id: amenity.id,
        amenities: amenities,
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
                  <div key={space.name}>
                    {' '}
                    <DisplayCard
                      key={space.name}
                      pageRoute={`places/${space.id}`}
                      imageLink={space.image}
                      placeName={space.name}
                      flavourText={space.address}
                      amenityList={`${trueAmenitiesWithId?.find(
                        (amenity) => Number(amenity.id) === space.id
                      )?.amenities}`}
                    />
                    <button
                      onClick={() => {
                        DeleteWorkPlace(space.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Flex>
    </>
  );
}
