import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/database.types';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });
  if (error) {
    const errorMessage = error.message;
    const redirectUrl = `${
      requestUrl.origin
    }/error?message=${encodeURIComponent(errorMessage)}`;
    return NextResponse.redirect(redirectUrl, {
      status: 301,
    });
  } else {
    const redirectUrl = `${requestUrl.origin}/`;

    return NextResponse.redirect(redirectUrl, {
      status: 301,
    });
  }
}
