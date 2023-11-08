'use client';

import { Button, Heading, Link } from '@radix-ui/themes';
import FormInput from '../components/AuthForm';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const userEmail = searchParams.get('email')

  // how do i check if a user is logged in when they go to /login
  // if they are not logged in, show the login form
  // if they are logged in, show a welcome message and a logout button


  if(success==='true') {
    return (
      <>
        <Heading>Welcome {userEmail} !</Heading>
        <Link href='/'>Go Home</Link>
        <Button formAction="/auth/logout">Logout</Button>
      </>
    )
  }

  else {
    return (
      <>
        <div className='max-w-xl'>
          <form
            className='space-y-3'
            action="auth/login"
            method="post">
            <FormInput
              name='email'
              type='email'
              placeholder='Email'
            />
            <FormInput
              name='password'
              type='password'
              placeholder='Password'
            />
              <Button>Sign in</Button>
              <Button formAction="/auth/sign-up">Sign up</Button>
            </form>
        </div>
      </>
    );
  }
}
