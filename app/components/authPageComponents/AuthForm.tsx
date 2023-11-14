'use client';

import { Button, TextField, Flex, Heading } from '@radix-ui/themes';
import { FormInputProps } from '@/app/utils/types';

const FormInput: React.FC<FormInputProps> = ({ name, type, placeholder }) => {
  return (
    <TextField.Root>
      <TextField.Input name={name} type={type} placeholder={placeholder} />
    </TextField.Root>
  );
};

export const WholeForm: React.FC = () => {
  return (
    <>
      <div className='flex h-screen justify-center '>
        <form
          className='mb-auto mt-auto w-2/12 space-y-3'
          action='auth/login'
          method='post'
        >
          <Heading as='h1' className='ms:sm py-2'>
            Sign In or Sign Up
          </Heading>
          <FormInput name='email' type='email' placeholder='Email' />
          <FormInput name='password' type='password' placeholder='Password' />

          <div className='flex justify-between'>
            <Button>Sign in</Button>
            <Button formAction='/auth/sign-up'>Sign up</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WholeForm;
