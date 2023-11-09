'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { PopularCarousel } from '../utils/types';
import { DisplayPlaceCard } from './DisplayPlaceCard';

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
        <DisplayPlaceCard
          pageRoute={`places/${places[slide].id}`}
          imageLink={places[slide].image}
          placeName={places[slide].name}
          flavourText={places[slide].address}
        />
      )}
      {cities && (
        <DisplayPlaceCard
          pageRoute={`cities/${cities[slide].id}`}
          imageLink={cities[slide].image}
          placeName={cities[slide].name}
          flavourText={cities[slide]['work_spaces'][0]['count']}
        />
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
