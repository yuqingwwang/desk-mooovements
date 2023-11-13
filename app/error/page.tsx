'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heading, Blockquote } from '@radix-ui/themes';

const ErrorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  // redirect to login page in 3 seconds
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  }, []);

  return (
    <div>
      <Heading>Oops, something went wrong.</Heading>
      <Blockquote>{message}</Blockquote>
    </div>
  );
};

export default ErrorPage;
