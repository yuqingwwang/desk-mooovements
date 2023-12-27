import { Cities, Profiles, Reviews, WorkSpaces } from '@/app/lib/allTypes';
import { createKysely } from '@vercel/postgres-kysely';

// define types
type Database = {
  cities: Cities;
  profiles: Profiles;
  reviews: Reviews;
  work_spaces: WorkSpaces;
};

export const db = createKysely<Database>();
