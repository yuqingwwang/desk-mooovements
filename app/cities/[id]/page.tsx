import { CityData, PageByIDParams } from '@/app/utils/types';
import Navbar from '@/app/components/NavBar';
import allData from '@/app/utils/getData';
import DisplayCityPage from '@/app/components/cityPageComponents/DisplayCityPage';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

async function fetchData(id: string): Promise<CityData> {
  const result = (await allData(id)) as CityData;
  console.log(result);
  return result;
}

export default async function cities({ params }: PageByIDParams) {
  const { city, workSpacesData, trueAmenitiesWithId } = await fetchData(
    params.id
  );
  console.log(city);
  if (!city) notFound();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <DisplayCityPage
        city={city}
        workSpacesData={workSpacesData}
        trueAmenitiesWithId={trueAmenitiesWithId}
      />
      <Navbar user={user && user.id} />
    </>
  );
}
