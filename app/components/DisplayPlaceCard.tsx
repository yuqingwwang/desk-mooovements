'use client';
import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Card, Flex, Text, Badge } from '@radix-ui/themes';
import { PlaceCardParams } from '../utils/types';

type ColorKey = 'room' | 'access' | 'yoga' | 'pet-friendly' | 'shower';

const getColorByKey = (key: ColorKey) => {
  const colors: any = {
    pet_friendly: 'indigo',
    opens_till_late: 'cyan',
    has_wifi: 'orange',
    has_socket: 'crimson',
    has_shower: 'Violet',
    has_meeting_room: 'tomato',
    has_phone_booth: 'mint',
    has_locker: 'Teal',
  };
  return (colors[key] as any) || 'gray'; // Default to gray if the key doesn't match
};

export function DisplayPlaceCard({
  pageRoute,
  imageLink,
  placeName,
  flavourText,
  amenityList,
}: PlaceCardParams) {
  return (
    <Card style={{ minWidth: 400, minHeight: 250 }}>
      <Link href={`/${pageRoute}`}>
        <Flex gap='9' align='center'>
          <Avatar
            size='9'
            src={imageLink ?? ''}
            radius='full'
            fallback='T'
            className='ml-4 mt-8'
          />
          <Box>
            <Text as='div' size='8' weight='bold'>
              {placeName}
            </Text>

            {amenityList?.split(',').map((item: any, index: number) => (
              <Badge
                className='mr-2'
                color={getColorByKey(item)}
                key={item + index}
              >
                {item}
              </Badge>
            ))}

            <Text as='div' size='3' color='gray'>
              {flavourText}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}
