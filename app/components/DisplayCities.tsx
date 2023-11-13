import { SupabaseCall } from '@/utils/supabaseCall';
import Carousel from './Carousel';
import { City, Workspace } from '../utils/types';
import { SearchBar } from './SearchBar';


const DisplayCities = async () => {
  const cities: City[] =
    (await SupabaseCall(
      'cities',
      'id,name,country,work_spaces(count),image',
      '',
      ''
    )) || [];

  const places: Workspace[] =
    (await SupabaseCall('work_spaces', 'id,name,address,image,city', '', '')) ||
    [];
  return (
    <div>
      <SearchBar cities={cities ?? []} />
      <div
        id='popularCities'
        className='mt-5 flex flex-col flex-wrap content-center border-4 border-double border-yellow-500'
      >
        <Carousel places={places && places} />
        <Carousel cities={cities && cities} />
      </div>
    </div>
  );
};

export default DisplayCities;
