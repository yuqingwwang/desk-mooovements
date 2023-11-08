'use client';
import React, { useState } from 'react';
import Link from 'next/link';
export default function Carousel(props: any) {
  function UpdateSlide() {
    const length = props.places ? props.places.length : props.cities.length;
    if (slide >= length - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  const [slide, setSlide] = useState(0);
  // console.log(props)
  return (
    <div>
      {props.places && (
        <Link href={`/places/${props.places[slide].id}`}><div className='w-fit border-4 border-double border-yellow-500'>
          <div className='h-52 w-52 bg-red-500'></div>{' '}
          {/* this will have image eventually div is placeholder */}
          <p>{props.places[slide].name}</p>
          <p>{props.places[slide].address}</p>
        </div>
        </Link>
        
      )}
      {props.cities && (
        <Link href={`cities/${props.cities[slide].id}`}>  <div className='w-fit border-4 border-double border-yellow-500'>
          <div className='h-52 w-52 bg-red-500'></div>{' '}
          {/* this will have image eventually div is placeholder */}
          <p>{props.cities[slide].name}</p>
          <p>{props.cities[slide]['work_spaces'][0]['count']}</p>
        </div>
        </Link>
       
      )}
      <button
        onClick={() => {
          {
            UpdateSlide();
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
