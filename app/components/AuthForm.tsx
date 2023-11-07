import { TextField } from '@radix-ui/themes';

interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <TextField.Root>
      <TextField.Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </TextField.Root>
  );
};

export default FormInput;
