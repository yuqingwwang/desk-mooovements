import { getCities, getSpaces, getSpacesCount } from '@/app/lib/vercel-storage';
import Carousel from '@/components/Carousel';
import { Flex } from '@radix-ui/themes';

export const revalidate = 0; // fetched on every single request

export default async function cities() {
  let cities = await getCities();
  const spaces = await getSpaces();
  // add count to cities
  for (let i = 0; i < cities.length; i++) {
    const count = await getSpacesCount(cities[i].id);
    cities[i].count = Number(count.count);
  }
  // filter out cities with count as null or undefined or '0'
  cities = cities.filter((city) => city.count && city.count !== 0);
  // sort cities by count
  cities.sort((a, b) => (b.count as number) - (a.count as number));

  return (
    <Flex
      id='popularCities'
      className='mt-5
        flex flex-col flex-wrap
        content-center'
    >
      <Carousel title='cities' data={cities} />
      <Carousel title='places' data={spaces} />
    </Flex>
  );
}
