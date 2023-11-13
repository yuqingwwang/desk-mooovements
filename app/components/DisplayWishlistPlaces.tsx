'use client';
import React from 'react';
import { Amenities } from '../utils/types';
import Navbar from '@/app/components/NavBar';
import { Heading, Text, Button, Flex, Box } from '@radix-ui/themes';
import { useState } from 'react';
import { DisplayPlaceCard } from '@/app/components/DisplayPlaceCard';
export default function DisplayWishlistPlaces({ places, wishlist }) {
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
  return (
    // {places.filter((place)=>wishlist.some(x => x === place.id)).map((place, index) => (

    //   <p key={index}>{place.name + place.id}</p>
    // ))}

    <>
      <Navbar />
      <Flex direction='column' gap='3'>
        {places && places.length > 0 ? (
          <>
            <Heading as='h2' size='5'>
              {places && wishlist.length} Work Spaces
            </Heading>
            {places &&
              places
                .filter((space) => wishlist.some((x) => x === space.id))
                .map((space) => (
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
