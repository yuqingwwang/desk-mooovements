'use client';

import AuthBtn from '@/components/buttons/AuthButton';
import BurgerBtn from '@/components/buttons/BurgerBtn';
import { LinkData } from '@/app/utils/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import NavItem from './NavItem';

const linkData: LinkData[] = [
  { href: '/', label: 'Home' },
  { href: '/wishlist', label: 'Wish List' },
  { href: '/add-workplace', label: 'Add Workplace' },
];

export default function NavBar({ user }: { user: string | null }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const router = useRouter();

  const handleLoginButtonClick = () => {
    router.push('/login');
  };

  return (
    <>
      <div className='mb-[5rem]'></div>
      <nav
        data-testid='navbar'
        className='fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900'
      >
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <a
            data-testid='navbar-home-link'
            href='/'
            className='flex items-center'
          >
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              DeskMooovement
            </span>
          </a>
          {/* desktop view */}
          <div className='hidden md:flex'>
            <ul className='mt-4 flex space-x-8 rounded-lg border border-gray-100 bg-gray-50 p-0 font-medium'>
              {!isMenuOpen &&
                linkData.map((item, index) => (
                  <NavItem key={index} href={item.href} label={item.label} />
                ))}
            </ul>
          </div>
          {/* mobile view burger menu closed */}
          <div className='flex md:order-2'>
            {user ? (
              <form method='post' action='/auth/logout'>
                <AuthBtn type='logout' />
              </form>
            ) : (
              <AuthBtn type='login' handleClick={handleLoginButtonClick} />
            )}
            <BurgerBtn isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
          {/* mobile view burger menu opened */}
          {isMenuOpen && <MobileMenu items={linkData} />}
        </div>
      </nav>
    </>
  );
}
