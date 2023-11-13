import WholeForm from '../components/AuthForm';
import AddProfile from '../components/AddProfile';
import Navbar from '../components/NavBar';

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
    return <AddProfile email={user?.email || ''} id={user?.id || ''} />;
  }

  // else render the login/signup form
  return (
    <>
      <Navbar user={user && user} />
      <WholeForm />
    </>
  );
}
