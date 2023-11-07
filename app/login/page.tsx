"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Database } from '../lib/supabase';
import ErrorMessage from '../components/ErrorMessage';
import { TextField, Heading, Button } from '@radix-ui/themes';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [errorMessage, successMessage]);

  const handleSignUp = async () => {
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      // TODO: This is a hacky way to get the error message from the response
      const errorMessagePattern = /"message":"(.*?)"/;
      const match = errorMessagePattern.exec(JSON.stringify(response));
      if (match && match[1]) {
        const errorMessage = match[1];
        setErrorMessage(errorMessage);
      } else {
        setSuccessMessage('Sign up successful. Redirecting to home page...');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }

    } catch (error) {
      setErrorMessage('Sign up failed. Please try again.');
    }
    router.refresh();
  };

  const handleSignIn = async () => {
    try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const errorMessagePattern = /"message":"(.*?)"/;
    const match = errorMessagePattern.exec(JSON.stringify(response));

    if (match && match[1]) {
      setErrorMessage("Sign in failed. Please try again.");
    } else {
      setSuccessMessage('Sign in successful. Redirecting to home page...');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  } catch (error) {
    setErrorMessage('Sign in failed. Please try again.');
  }
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // display success message
    router.refresh();
  };

  return (
    <>
      {errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <Heading as="h1" className="py-3">
        Sign Up
      </Heading>
      <div className="max-w-xl">
        <form className="space-y-3" action="/auth/login" method="post">
          <TextField.Root>
            <TextField.Input
              name="username"
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </TextField.Root>

          <Button formAction="/auth/sign-up" onClick={handleSignUp}>
            Sign up
          </Button>
          <Button onClick={handleSignIn}>Sign in</Button>
          <Button onClick={handleSignOut}>Sign out</Button>
        </form>
      </div>
    </>
  );
}
