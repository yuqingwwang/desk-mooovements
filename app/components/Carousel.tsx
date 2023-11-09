'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import { PopularCarousel } from '../utils/types';

export default function Carousel({ cities, places }: PopularCarousel) {
  function AddToSlide() {
    const length = places ? places.length : cities ? cities.length : 0;
    if (slide >= length - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  function SubtractFromSlide() {
    const length = places ? places.length : cities ? cities.length : 0;

    if (slide <= 0) setSlide(length - 1);
    else setSlide(slide - 1);
  }
  const [slide, setSlide] = useState(0);
  return (
    <div className='my-7'>
      {places && (
        <Card style={{ minWidth: 400, minHeight: 250 }}>
          <Link href={`/places/${places[slide].id}`}>
            <Flex gap='9' align='center'>
              <Avatar
                size='9'
                src={places[slide].image ?? ''}
                radius='full'
                fallback='T'
                className='ml-4 mt-8'
              />
              <Box>
                <Text as='div' size='8' weight='bold'>
                  {places[slide].name}
                </Text>
                <Text as='div' size='6' color='gray'>
                  {places[slide].address}
                </Text>
              </Box>
            </Flex>
          </Link>
        </Card>
      )}
      {cities && (
        <Card style={{ minWidth: 400, minHeight: 250 }}>
          <Link href={`cities/${cities[slide].id}`}>
            <Flex gap='9' align='center'>
              <Avatar
                size='9'
                src={cities[slide].image ?? ''}
                radius='full'
                fallback='T'
                className='ml-4 mt-8'
              />
              <Box>
                <Text as='div' size='8' weight='bold'>
                  {cities[slide].name}
                </Text>
                <Text as='div' size='6' color='gray'>
                  {cities[slide]['work_spaces'][0]['count']}
                </Text>
              </Box>
            </Flex>
          </Link>
        </Card>
      )}
      <button
        onClick={() => {
          {
            SubtractFromSlide();
          }
        }}
        className='mx-1'
      >
        Prev
      </button>
      <button
        onClick={() => {
          {
            AddToSlide();
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
