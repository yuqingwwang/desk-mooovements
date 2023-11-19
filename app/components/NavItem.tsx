import { NavItemProps } from '@/app/utils/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`block rounded px-4 py-2 ${
          isActive
            ? 'bg-blue-700 text-white'
            : 'text-gray-900 hover:bg-gray-100'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
