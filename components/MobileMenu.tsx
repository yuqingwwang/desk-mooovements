import { NavItemProps } from '@/app/utils/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileMenu: React.FC<{ items: NavItemProps[] }> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div
      className='w-full items-center justify-between md:order-1 md:flex md:w-auto'
      id='navbar-sticky'
    >
      <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900'>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`block rounded py-2 pl-3 pr-4 ${
                pathname === item.href
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              } ${
                pathname === item.href
                  ? 'dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                  : 'dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
              } md:p-0 md:hover:bg-transparent md:hover:text-blue-700 ${
                pathname === item.href
                  ? 'md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  : 'md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
              }`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
