import { TextField } from '@radix-ui/themes';

interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  placeholder,
}) => {
  return (
    <TextField.Root>
      <TextField.Input
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </TextField.Root>
  );
};

export default FormInput;
