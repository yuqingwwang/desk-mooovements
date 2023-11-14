import React from 'react';
import { TextField } from '@radix-ui/themes';
import ErrorMessage from './ErrorMessage';

interface CustomTextFieldProps {
  placeholder: string;
  name: string;
  register: any;
  errorMessage: string | undefined;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  name,
  register,
  errorMessage,
}) => {
  return (
    <>
      <TextField.Root>
        <TextField.Input
          placeholder={placeholder}
          {...register(name, { required: `${name} is required` })}
        />
      </TextField.Root>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  );
};

export default CustomTextField;
