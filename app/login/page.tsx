import WholeForm from '../components/AuthForm';
import Navbar from '../components/NavBar';
import { Heading } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../database.types';

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

  // else render the login/signup form
  return (
    <>
      <Heading as='h1' className='py-3'>
        Sign In or Sign Up
      </Heading>
      <WholeForm />
      <Navbar user={user && user} />
    </>
  );
}
