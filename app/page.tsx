import Navbar from '@/app/components/NavBar';
import { Database } from '@/database.types';
import { Heading } from '@radix-ui/themes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DisplayCities from './components/DisplayCities';
import { PageByIDParams } from './utils/types';

export default async function ServerComponent({ params }: PageByIDParams) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <main>
        <Heading as='h1' size='8' align='center'>
          Welcome to desk-mooovements!
        </Heading>
        <DisplayCities />

        <Navbar user={user && user.id} />
      </main>
    </>
  );
}
