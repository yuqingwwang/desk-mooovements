'use client';

import { Button, TextField, Flex } from '@radix-ui/themes';
import { FormInputProps } from '../utils/types';

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
      <div className='max-w-xl'>
        <form className='space-y-3' action='auth/login' method='post'>
          <FormInput name='email' type='email' placeholder='Email' />
          <FormInput name='password' type='password' placeholder='Password' />

          <Flex gap='3'>
            <Button>Sign in</Button>
            <Button formAction='/auth/sign-up'>Sign up</Button>
          </Flex>
        </form>
      </div>
    </>
  );
};

export default WholeForm;
