import { db } from './vercel-storage';

// get number of spaces in each city
export async function getSpacesCount(
  cityNumber: number
): Promise<{ count: string | null }> {
  const res = await db
    .selectFrom('work_spaces')
    .innerJoin('cities', 'work_spaces.city', 'cities.id')
    .select(({ fn }) => [fn.count<number>('work_spaces.id').as('count')])
    .groupBy('cities.name')
    .where('cities.id', '=', cityNumber)
    .execute();

  if (res.length === 0) {
    return { count: '0' };
  }

  return { count: res[0].count.toString() };
}
