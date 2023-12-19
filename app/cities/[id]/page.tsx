import DisplayCityPage from '@/components/DisplayCityPage';
import Navbar from '@/components/NavBar';
import cityData from '@/app/utils/getCity';
import { PageByIDParams } from '@/app/utils/types';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getCities } from '@/app/lib/vercel-storage'


export const revalidate = 0; // fetched on every single request

async function fetchData(id: string) {
  const result = (await cityData(id)) as any;
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
