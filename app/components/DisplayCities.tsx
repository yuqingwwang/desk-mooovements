'use client';

import { useEffect, useState } from 'react';
import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';

type Place = {
  id: number;
  created_at: string;
  created_by: number;
  name: string;
  address: string;
  image: string;
  city: number;
  pet_friendly: boolean;
  opens_till_late: boolean;
  has_wifi: boolean;
  has_socket: boolean;
  has_shower: boolean;
  has_meeting_room: boolean;
  has_phone_booth: boolean;
  has_locker: boolean;
};

type City = {
  id: number;
  name: string;
  country: string;
};

const DisplayCities = () => {
  //   let cities: City[] | null = null;
  //   let places: Place[] | null = null;
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [places, setPlaces] = useState<Place[] | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const citiesResult = await SupabaseCall(
        'cities',
        'id,name,country,work_spaces(count)',
        '',
        ''
      );
      setCities(citiesResult ?? undefined);

      const placesResult = await SupabaseCall(
        'work_spaces',
        'id,name,address,image,city',
        '',
        ''
      );
      setPlaces(placesResult ?? undefined);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* {cities?.map((city) => <p key={city.name}>{city.name}</p>)}
      {places?.map((place) => <p key={place.name}>{place.name}</p>)} */}
      <div
        id='popularCities'
        className='flex flex-wrap justify-between border-4 border-double border-yellow-500'
      >
        <Carousel places={places} />
        <Carousel cities={cities} />
      </div>
    </div>
  );
};

export default DisplayCities;
