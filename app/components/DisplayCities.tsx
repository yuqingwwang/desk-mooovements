'use client';

import { useEffect, useState } from 'react';
import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';
import { City, Workspace } from '../utils/types';
import { SearchBar } from './SearchBar';
import { Flex, Heading } from '@radix-ui/themes';

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
      console.log(citiesResult);

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
      <Flex
        id='popularCities'
        className='mt-5
        flex flex-col flex-wrap
        content-center border-4
        border-double
        border-yellow-500'
      >
        <Carousel title='cities' data={cities} />
        <Carousel title='places' data={places} />
      </Flex>
    </div>
  );
};

export default DisplayCities;
