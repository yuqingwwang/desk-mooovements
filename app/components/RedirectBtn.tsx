import { Button } from '@radix-ui/themes';

const RedirectBtn = () => {
  return (
    <div>
      <Button
        onClick={() => {
          alert('You first need to be login');
        }}
      >
        Add to wishlist
      </Button>
    </div>
  );
};

export default RedirectBtn;
