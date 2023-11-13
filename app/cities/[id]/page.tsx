import { CityData, PageByIDParams } from '@/app/utils/types';
import Navbar from '@/app/components/NavBar';
import allData from '@/app/utils/getData';
import DisplayCityPage from '@/app/components/cityPageComponents/DisplayCityPage';

async function fetchData(id: string): Promise<CityData> {
  const result = (await allData(id)) as CityData;
  return result;
}

export default async function cities({ params }: PageByIDParams) {
  const { city, workSpacesData, trueAmenitiesWithId } = await fetchData(
    params.id
  );

  return (
    <>
      <DisplayCityPage
        city={city}
        workSpacesData={workSpacesData}
        trueAmenitiesWithId={trueAmenitiesWithId}
      />
      <Navbar />
    </>
  );
}
