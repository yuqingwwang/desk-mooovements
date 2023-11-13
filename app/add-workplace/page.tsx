import React from 'react';
import AddWorkplace from '../components/New-worplace';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/database.types';

const FormAddingWorkplace = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AddWorkplace user={user && user.id} />
    </div>
  );
};

export default FormAddingWorkplace;
