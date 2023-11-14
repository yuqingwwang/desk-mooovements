'use client';
import React, { useState } from 'react';
import { DisplayPlaceCard } from './DisplayPlaceCard';
import { Button, Flex, Heading } from '@radix-ui/themes';

export default function Carousel({ title, data }: any) {
  function addToSlide() {
    const length = data ? data.length : 0;
    if (slide >= length - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  function subtractFromSlide() {
    const length = data ? data.length : 0;
    if (slide <= 0) setSlide(length - 1);
    else setSlide(slide - 1);
  }
  const [slide, setSlide] = useState(0);

  return (
    <Flex className='my-7' direction='column' data-testid={data ? 'data' : ''}>
      {data && (
        <>
          <Heading
            as='h2'
            size='6'
            align='center'
            style={{
              marginBottom: '30px',
            }}
          >
            Popular {title}
          </Heading>
          <DisplayPlaceCard
            pageRoute={`${title}/${data[slide].id}`}
            imageLink={data[slide]['image']}
            placeName={data[slide]['name']}
            flavourText={
              title === 'cities'
                ? data[slide]['work_spaces'][0]['count'] + ' workspaces'
                : data[slide]['address']
            }
          />
        </>
      )}

      <Flex
        align='stretch'
        justify='center'
        display='inline-flex'
        className='m-4'
        gap='9'
      >
        <div className='mt-5 flex justify-end'>
          <Button onClick={() => subtractFromSlide()} size='3'>
            Prev
          </Button>
          <Button onClick={() => addToSlide()} size='3'>
            Next
          </Button>
        </div>
      </Flex>
    </Flex>
  );
}
