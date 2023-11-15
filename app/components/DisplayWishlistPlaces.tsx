'use client';
import React from 'react';
import { Amenities, Profile } from '../utils/types';
import { Heading, Flex } from '@radix-ui/themes';
import { WishlistDisplay } from '../utils/types';
import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';
import newClient from '../config/supabaseclient';
import { SupabaseCall } from '@/utils/supabaseCall';
import { useState } from 'react';
import Router from 'next/router';
export default function DisplayWishlistPlaces({
  places,
  wishlist,
  wishListArr,
  user,
}: WishlistDisplay) {
  async function DeleteWorkPlace(valueToDelete: number) {
    const supabase = newClient();

    const updatedWishList =
      wishListArr &&
      wishListArr[0]['wish_list'] &&
      wishListArr[0]['wish_list'].filter((x) => x !== valueToDelete);

    console.log(updatedWishList);

    const { data, error } = await supabase
      .from('profiles')
      .update({ wish_list: updatedWishList })
      .eq('id', user);

    if (error) {
      console.error('Error:', error.message);
    }
    Router.reload();
  }
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
        amenities: amenities as string[],
      };
    });
  console.log('This is the wishlist', wishlist);
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
                    <DisplayPlaceCard
                      pageRoute={`places/${space.id}`}
                      imageLink={space.image}
                      placeName={space.name}
                      // flavourText={space.address}
                      flavourText={`${trueAmenitiesWithId?.find(
                        (amenity) =>
                          amenity.id === (space.id as unknown as string)
                      )?.amenities}`}
                    />
                    <button onClick={() => DeleteWorkPlace(space.id)}>
                      Delete
                    </button>
                  </div>
                ))}
          </>
        ) : (
          <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
        )}
      </Flex>
    </>
  );
}
