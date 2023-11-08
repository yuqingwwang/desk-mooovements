import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './lib/supabase';
import DisplayCities from './components/DisplayCities';

// import { SupabaseCall } from '@/utils/supabaseCall';
// import Carousel from './components/Carousel';

// type City = Database['public']['Tables']['cities'];
// type Place = Database['public']['Tables']['work_spaces'];

export default async function ServerComponent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  return (
    <main>
      <h1>Welcome to desk-mooovements!</h1>
      <DisplayCities />
    </main>
  );
}
