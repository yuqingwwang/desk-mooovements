import { getSpacesInCity } from '@/app/lib/vercel-storage';
import { PageByIDParams } from '@/app/utils/types';
import DisplayCityPage from '@/components/DisplayCityPage';
import { notFound } from 'next/navigation';

export const revalidate = 0; // fetched on every single request

export default async function cities({ params }: PageByIDParams) {
  const workSpacesdata = await getSpacesInCity(params.id);

  if (workSpacesdata.length === 0) notFound();

  // const user = await getUser();

  return (
    <>
      {/* <Navbar user={user && user.id} /> */}
      <DisplayCityPage workSpacesData={workSpacesdata} />
    </>
  );
}
