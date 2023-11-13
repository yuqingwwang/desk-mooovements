import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';
import { City, Workspace } from '../utils/types';
import { SearchBar } from './SearchBar';
import { Flex } from '@radix-ui/themes';

const DisplayCities = async () => {
  const cities: City[] =
    (await SupabaseCall(
      'cities',
      'id,name,country,work_spaces(count),image',
      '',
      ''
    )) || [];
  
  if (cities) {
        // sort by number of workspaces
        cities.sort(
          (a, b) => b.work_spaces[0].count - a.work_spaces[0].count
        );

        // keep up to 3 cities
        cities.splice(3);
      }

  const places: Workspace[] =
    (await SupabaseCall(
        'work_spaces',
        'id, name, address, image, city, reviews(count)',
        '',
        ''
      ) ||
    [];
  
  if (placesResult) {
        // sort by number of reviews
        placesResult.sort((a, b) => b.reviews[0].count - a.reviews[0].count);

        // keep up to 3 places
        placesResult.splice(3);
      }
  
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
