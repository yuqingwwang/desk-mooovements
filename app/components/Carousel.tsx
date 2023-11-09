'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';

export default function Carousel(props: any) {
  function AddToSlide() {
    const length = props.places ? props.places.length : props.cities.length;
    if (slide >= length - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  function SubtractFromSlide() {
    const length = props.places ? props.places.length : props.cities.length;
    if (slide <= 0) setSlide(length - 1);
    else setSlide(slide - 1);
  }
  const [slide, setSlide] = useState(0);
  // console.log(props)
  return (
    <div className='my-7'>
      {props.places && (
        <Card style={{ minWidth: 400, minHeight: 250 }}>
        <Link href={`/places/${props.places[slide].id}`}>
          <Flex gap='9' align='center'>
            <Avatar
              size='9'
              src={props.places[slide].image}
              radius='full'
              fallback="T"
              className='mt-8 ml-4'
            />
            <Box>
              <Text as='div' size='8' weight='bold'>
              {props.places[slide].name}
              </Text>
              <Text as='div' size='6' color='gray'>
              {props.places[slide].address}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Card>

       
      )}
      {props.cities && (
        <Card style={{ minWidth: 400, minHeight: 250 }}>
          <Link href={`cities/${props.cities[slide].id}`}>
            <Flex gap='9' align='center'>
              <Avatar
                size='9'
                src={props.cities[slide].image}
                radius='full'
                fallback="T"
                className='mt-8 ml-4'
              />
              <Box>
                <Text as='div' size='8' weight='bold'>
                  {props.cities[slide].name}
                </Text>
                <Text as='div' size='6' color='gray'>
                  {props.cities[slide]['work_spaces'][0]['count']}
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
