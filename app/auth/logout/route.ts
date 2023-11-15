import { COOKIE_KEY } from '@/app/utils/constants';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '../../../database.types';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  await supabase.auth.signOut();

  cookieStore.delete(COOKIE_KEY);

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
