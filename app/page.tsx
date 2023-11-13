import DisplayCities from './components/DisplayCities';
import Link from 'next/link';
import Navbar from '@/app/components/NavBar';
import { Heading } from '@radix-ui/themes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PageByIDParams } from './utils/types';
import { Database } from '@/database.types';

export default async function ServerComponent({ params }: PageByIDParams) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('This is the user from the home page', user);
  return (
    <>
      <main>
        <Heading as='h1' align='center'>
          Welcome to desk-mooovements!
        </Heading>
        <DisplayCities />
        <Link href={'/add-workplace'} className='m-3'>
          <button className='inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white'>
            <span className='mx-auto'>Add Workplace</span>
          </button>
        </Link>
        <Navbar user={user && user.id} />
      </main>
    </>
  );
}
