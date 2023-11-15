import { Heading } from '@radix-ui/themes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-16'>
      <Heading as='h1' size={{ sm: '7', md: '9' }} className='pt-4'>
        Not found – 404!
      </Heading>
      <div>
        <Link href='/'>Go back to Home</Link>
      </div>
    </div>
  );
}
