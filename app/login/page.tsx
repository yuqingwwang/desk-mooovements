
// "use client";

// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Heading, Button } from '@radix-ui/themes';
// import FormInput from '../components/AuthForm';
// import ErrorMessage from '../components/ErrorMessage';
// import SuccessMessage from '../components/SuccessMessage';
// import type { Database } from '../lib/supabase';
// import { useAutoClearMessage, extractErrorMessage } from '../utils/authFunctions';


// export default function Login() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [userId, setUserId] = useState('');
//   const [userName, setUserName] = useState('');
//   const [CurrentPage, setCurrentPage] = useState('Sign up');
//   const supabase = createClientComponentClient<Database>();

//   useAutoClearMessage(errorMessage, () => setErrorMessage(''));
//   useAutoClearMessage(successMessage, () => setSuccessMessage(''));


//   useEffect(() => {
//     async function getUserID() {
//       const user = await supabase.auth.getUser();
//       if (user.data?.user) {
//         setUserId(user.data.user.id);
//         setUserName(user.data.user.email|| '');
//       }
//     }


//     getUserID();
//   }, []);

//   useEffect(() => {
//     if (userId!='') {
//       setCurrentPage('Sign out');
//     } else {
//       setCurrentPage('Sign up');
//     }
//   }, [userId]);


//   const redirectToHomePage = () => {
//     setTimeout(() => {
//       router.push('/');
//     }, 3000);
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password.length < 6) {
//       setErrorMessage('Password must be at least 6 characters long');
//       return;
//     }

//     try {
//       const response = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//       });


//       const errorMessage = extractErrorMessage(response);
//       if (errorMessage) {
//         setErrorMessage(errorMessage);
//         return;
//       }
//       else {
//         setSuccessMessage('Sign up successful. Redirecting to home page...');
//         redirectToHomePage();
//       }

//     } catch (error) {
//       setErrorMessage('Sign up failed. Please try again.');
//     }
//     router.refresh();
//   };

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await supabase.auth.signInWithPassword({
//         email: formData.email,
//         password: formData.password,
//       });

//       const errorMessage = extractErrorMessage(response);
//       if (errorMessage) {
//         setErrorMessage("Sign in failed. Please try again.");
//         return;
//       } else {
//         setSuccessMessage('Sign in successful. Redirecting to home page...');
//         redirectToHomePage();
//       }
//     } catch (error) {
//     setErrorMessage('Sign in failed. Please try again.');
//     }
//   };

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     setSuccessMessage('Sign out successful. Redirecting to home page...');
//     redirectToHomePage();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       {errorMessage && (
//         <ErrorMessage>{errorMessage}</ErrorMessage>
//       )}
//       {successMessage && (
//         <SuccessMessage>{successMessage}</SuccessMessage>
//       )}
//       <Heading as="h1" className="py-3">
//         {userId ? `Welcome, ${userName}` : CurrentPage}
//       </Heading>
//       <div className="max-w-xl">
//       {userId ? (
//         <Button onClick={handleSignOut}>Sign out</Button>
//       ) : (
//         <form className="space-y-3" onSubmit={handleSignUp}>
//           <FormInput
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <FormInput
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button type="submit">Sign up</Button>
//           <Button onClick={handleSignIn}>Sign in</Button>
//         </form>
//       )}
//       </div>
//     </>
//   );
// }


import React from 'react'

const page = () => {
  return (

    <div>page</div>
  )


export default page;