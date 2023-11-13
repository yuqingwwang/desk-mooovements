import { CityData, PageByIDParams } from '@/app/utils/types';
import Navbar from '@/app/components/NavBar';
import allData from '@/app/utils/getData';
import DisplayCityPage from '@/app/components/cityPageComponents/DisplayCityPage';
import { allAmenities } from '@/app/utils/constants';
async function fetchData(id: string): Promise<CityData> {
  const result = (await allData(id)) as CityData;
  return result;
}

export default async function cities({ params }: PageByIDParams) {
  const { city, workSpacesData, trueAmenitiesWithId } = await fetchData(
    params.id
  );

  function placesWithAmenity(amenity: string) {
    const matchedLists: string[] = [];
    trueAmenitiesWithId.map((item) => {
      if (item.amenities.includes(amenity)) {
        matchedLists.push(item.id);
      }
    });
    console.log(matchedLists);
  }

  placesWithAmenity('has_wifi');

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
