import { Button } from '@radix-ui/themes';

interface AuthBtnProps {
  type: 'login' | 'logout';
  handleClick?: () => void;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ type, handleClick }) => {
  let buttonText = '';
  const kwargs: Record<string, any> = {};

  if (type === 'logout') {
    buttonText = 'Log Out';
    kwargs.type = 'submit';
  } else if (type === 'login') {
    buttonText = 'Log In';
    kwargs.onClick = handleClick;
  }

  return (
    <Button className='mr-5' variant='soft' size='3' {...kwargs}>
      {buttonText}
    </Button>
  );
};

export default AuthBtn;
