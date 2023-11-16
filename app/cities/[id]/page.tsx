import DisplayCityPage from '@/app/components/DisplayCityPage';
import Navbar from '@/app/components/NavBar';
import allData from '@/app/utils/getData';
import { PageByIDParams } from '@/app/utils/types';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

async function fetchData(id: string) {
  const result = (await allData(id)) as any;
  return result;
}

export default async function cities({ params }: PageByIDParams) {
  const { city, actualWorkSpacesData, trueAmenitiesWithId } = await fetchData(
    params.id
  );

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
        actualWorkSpacesData={actualWorkSpacesData}
        trueAmenitiesWithId={trueAmenitiesWithId}
      />
      <Navbar user={user && user.id} />
    </>
  );
}
