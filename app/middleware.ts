import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import { COOKIE_KEY } from '@/app/utils/constants';
import type { Database } from '@/database.types';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    res.cookies.delete(COOKIE_KEY);
    return ['error', res];
  }

  return res;
}
