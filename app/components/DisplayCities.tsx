import allData from '@/app/utils/getCity';
import { City, WorkspaceWithReviews } from '@/app/utils/types';
import { Flex } from '@radix-ui/themes';
import Carousel from './Carousel';
import { SearchBar } from './SearchBar';

async function fetchData() {
  const result = (await allData('')) as any;
  return result;
}

export default async function DisplayCities() {
  const {
    allCities,
    allSpacesWithReviews,
  }: { allCities: City[]; allSpacesWithReviews: WorkspaceWithReviews[] } =
    await fetchData();

  let topCities: City[] = [];
  if (allCities) {
    // sort by number of workspaces and keep the top 3
    allCities.sort((a, b) => b.work_spaces[0].count - a.work_spaces[0].count);
    topCities = allCities.slice();
    topCities.splice(3);
  }

  if (allSpacesWithReviews) {
    console.log(allSpacesWithReviews);
    // sort by number of reviews
    allSpacesWithReviews.sort((a, b) => b.reviews.count - a.reviews[0].count);

    // keep up to 3 places
    allSpacesWithReviews.splice(3);
  }

  return (
    <div>
      <SearchBar cities={allCities ?? []} />
      <Flex
        id='popularCities'
        className='mt-5
        flex flex-col flex-wrap
        content-center'
      >
        <Carousel title='cities' data={topCities} />
        <Carousel title='places' data={allSpacesWithReviews} />
      </Flex>
    </div>
  );
}
