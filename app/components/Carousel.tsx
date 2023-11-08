'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Carousel(props: any) {
  function AddToSlide() {
    const length = props.places ? props.places.length : props.cities.length;
    if (slide >= length - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  function SubtractFromSlide() {
    const length = props.places ? props.places.length : props.cities.length;
    if (slide <= 0) setSlide(length -1);
    else setSlide(slide - 1);
  }
  const [slide, setSlide] = useState(0);
  // console.log(props)
  return (
    <div className='my-7'>
      {props.places && (
        <Link href={`/places/${props.places[slide].id}`}>
          <div className='w-fit border-4 border-double border-yellow-500'>
            <Image
              src={props.places[slide].image}
              alt='Picture of a workspace'
              width={200}
              height={200}
              priority={true}
            />
            <p>{props.places[slide].name}</p>
            <p>{props.places[slide].address}</p>
          </div>
        </Link>
      )}
      {props.cities && (
        <Link href={`cities/${props.cities[slide].id}`}>
          <div className='w-fit border-4 border-double border-yellow-500'>
          <Image
              src={props.cities[slide].image}
              alt='Picture of a workspace'
              width={200}
              height={200}
              priority={true}
            />
            <p>{props.cities[slide].name}</p>
            <p>{props.cities[slide]['work_spaces'][0]['count']}</p>
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
