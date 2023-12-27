import { Cities } from './allTypes';
import { db } from './vercel-storage';

export async function getCities(): Promise<Cities[]> {
  const res = await db
    .selectFrom('cities')
    .select(['id', 'name', 'image', 'country'])
    .execute();

  return res;
}
