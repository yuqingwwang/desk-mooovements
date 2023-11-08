'use client';

import { Button } from '@radix-ui/themes';
import FormInput from '../components/AuthForm';

export default function Login() {

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
