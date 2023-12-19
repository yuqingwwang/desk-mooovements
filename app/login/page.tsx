import Navbar from '@/components/NavBar';
import WholeForm from '@/components/forms/AuthForm';
import { Database } from '@/database.types';
import { Heading } from '@radix-ui/themes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <>
        <Heading as='h1' className='py-3'>
          Welcome, {user?.email || ''}
        </Heading>
        <Navbar user={user?.id || ''} />
      </>
    );
  }
  return (
    <>
      <WholeForm />
      <Navbar user={user && user} />
    </>
  );
}
