export default function BurgerBtn({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <button
      type='button'
      className='ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
      aria-controls='navbar-sticky'
      aria-expanded={isMenuOpen}
      onClick={toggleMenu}
    >
      <span className='sr-only'>Open main menu</span>
      <svg
        className='h-5 w-5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 17 14'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M1 1h15M1 7h15M1 13h15'
        />
      </svg>
    </button>
  );
}
