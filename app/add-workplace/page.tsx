import AddWorkplace from '@/components/forms/NewWorplace';
import { Database } from '@/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
