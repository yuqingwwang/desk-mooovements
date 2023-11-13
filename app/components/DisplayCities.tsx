'use client';

import { useEffect, useState } from 'react';
import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';
import { City, Workspace } from '../utils/types';
import { SearchBar } from './SearchBar';
import { Flex } from '@radix-ui/themes';

const DisplayCities = () => {
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [places, setPlaces] = useState<Workspace[] | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const citiesResult = await SupabaseCall(
        'cities',
        'id, name, country, work_spaces(count), image',
        '',
        ''
      );

      if (citiesResult) {
        // sort by number of workspaces
        citiesResult.sort(
          (a, b) => b.work_spaces[0].count - a.work_spaces[0].count
        );

        // keep up to 3 cities
        citiesResult.splice(3);
      }

      setCities(citiesResult ?? []);

      const placesResult = await SupabaseCall(
        'work_spaces',
        'id, name, address, image, city, reviews(count)',
        '',
        ''
      );

      if (placesResult) {
        // sort by number of reviews
        placesResult.sort((a, b) => b.reviews[0].count - a.reviews[0].count);

        // keep up to 3 places
        placesResult.splice(3);
      }
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
