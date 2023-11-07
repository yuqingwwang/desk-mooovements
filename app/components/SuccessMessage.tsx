import { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

const SuccessMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color='green' as='p'>
      {children}
    </Text>
  );
};

export default SuccessMessage;
