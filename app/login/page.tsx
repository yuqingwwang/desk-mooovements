import WholeForm from '../components/AuthForm';
import AddProfile from '../components/AddProfile';

import { cookies } from 'next/headers';

export default function Login() {
  const cookieStore = cookies();

  // if the user is already logged in, render the add profile
  const currentToken = cookieStore.get('sb-tkvonehonrmtoeqojhjs-auth-token');
  if (currentToken) {
    return <AddProfile />;
  }

  // else render the login/signup form
  return <WholeForm />;
}
