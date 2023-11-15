import { SupabaseCall } from '@/app/utils/supabaseCall';

export default async function getCityIds() {
  const cityWithId = await SupabaseCall('cities', 'name,id', '', '');

  return cityWithId;
}
