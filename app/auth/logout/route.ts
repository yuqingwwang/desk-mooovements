import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '../../lib/supabase';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  await supabase.auth.signOut();

  cookieStore.delete('sb-tkvonehonrmtoeqojhjs-auth-token');

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
