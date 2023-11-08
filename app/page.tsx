import DisplayCities from './components/DisplayCities';
import Link from 'next/link';

export default async function ServerComponent() {
  return (
    <main>
      <h1>Welcome to desk-mooovements!</h1>
      <DisplayCities />
      <Link href={'/add-workplace'}>
      <div className="m-3">
            <button
              className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto">Add Workplace</span>
            </button>
          </div>
      </Link>
      <Link href={'/login'}>
      <div className="m-3">
            <button
              className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto">Login</span>
            </button>
          </div>
      </Link>
    </main>
  );
}
