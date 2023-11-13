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

        <Navbar user={user && user.id} />
      </main>
    </>
  );
}
