'use client';
import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import { PlaceCardParams } from '../utils/types';

export function DisplayPlaceCard({
  pageRoute,
  imageLink,
  placeName,
  flavourText,
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
            <Text as='div' size='6' color='gray'>
              {flavourText}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  );
}
