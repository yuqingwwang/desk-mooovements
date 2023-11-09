'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <Link href={`/places/${places[slide].id}`}>
          <div className='w-fit border-4 border-double border-yellow-500'>
            <Image
              src={places[slide].image ?? ''}
              alt='Picture of a workspace'
              width={200}
              height={200}
              priority={true}
            />
            <p>{places[slide].name}</p>
            <p>{places[slide].address}</p>
          </div>
        </Link>
      )}
      {cities && (
        <Link href={`cities/${cities[slide].id}`}>
          <div className='w-fit border-4 border-double border-yellow-500'>
            <Image
              src={cities[slide].image ?? ''}
              alt='Picture of a workspace'
              width={200}
              height={200}
              priority={true}
            />
            <p>{cities[slide].name}</p>
            <p>{cities[slide]['work_spaces'][0]['count']}</p>
          </div>
        </Link>
      )}
      <button
        onClick={() => {
          {
            AddToSlide();
          }
        }}
        className='mx-1'
      >
        Next
      </button>
      <button
        onClick={() => {
          {
            SubtractFromSlide();
          }
        }}
      >
        Prev
      </button>
    </div>
  );
}
