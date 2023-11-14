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
      <div className='sm:align-center flex max-w-xl sm:flex sm:h-[500px] sm:w-full sm:max-w-full sm:justify-center'>
        <form
          className='w-full space-y-3 sm:mb-auto sm:mt-auto sm:w-full sm:max-w-[400px]'
          action='auth/login'
          method='post'
        >
          <Heading as='h1' className='ms:sm py-2'>
            Sign In or Sign Up
          </Heading>
          <FormInput name='email' type='email' placeholder='Email' />
          <FormInput name='password' type='password' placeholder='Password' />

          <div className='flex flex-wrap justify-around gap-8 sm:flex-nowrap sm:justify-start'>
            <Button>Sign in</Button>
            <Button formAction='/auth/sign-up'>Sign up</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WholeForm;
