import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './lib/supabase'

// import { SupabaseCall } from '@/utils/supabaseCall';
// import Carousel from './components/Carousel';

// type City = Database['public']['Tables']['cities'];
// type Place = Database['public']['Tables']['work_spaces'];

export default async function ServerComponent() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data } = await supabase.from('cities').select()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

// export async function Home() {

//   let cities: City[] | null = null;
//   let places: Place[] | null = null;

//   const cookieStore = cookies()
//   const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

//   cities = await SupabaseCall('cities', 'id,name,country, work_spaces(count)', '', '');

//   places = await SupabaseCall(
//     'work_spaces',
//     'id,name,address,image,city',
//     '',
//     ''
//   );
//   return (
//     <main>
//       <h1>Welcome to desk-mooovements!</h1>
//       {/* {fetchError && <p>{fetchError}</p>} */}
//       <div
//         id='popularCities'
//         className='border-4 border-double border-yellow-500 flex justify-between flex-wrap'
//       >
//         <Carousel places = {places}/>
//         <Carousel cities = {cities} />


//         </div>
//     </main>
//   );
// }
