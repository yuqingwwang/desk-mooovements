'use client';

import { useEffect, useState } from 'react';
import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';
import { City, Workspace } from '../utils/types';
import { SearchBar } from './SearchBar';

const DisplayCities = () => {
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [places, setPlaces] = useState<Workspace[] | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const citiesResult = await SupabaseCall(
        'cities',
        'id,name,country,work_spaces(count),image',
        '',
        ''
      );
      setCities(citiesResult ?? []);

      const placesResult = await SupabaseCall(
        'work_spaces',
        'id,name,address,image,city',
        '',
        ''
      );
      setPlaces(placesResult ?? []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar cities={cities ?? []} />
      <div
        id='popularCities'
        className='mt-5 flex flex-col flex-wrap content-center border-4 border-double border-yellow-500'
      >
        <Carousel places={places} />
        <Carousel cities={cities} />
      </div>
    </div>
  );
};

export default DisplayCities;
