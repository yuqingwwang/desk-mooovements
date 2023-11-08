'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Link, Heading, Blockquote } from '@radix-ui/themes';

const ErrorPage: React.FC = () => {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div>
      <Heading>Oops, something went wrong.</Heading>
      <Blockquote>{message}</Blockquote>
      <Link href='/login'>Try Again</Link>
    </div>
  );
};

export default ErrorPage;
