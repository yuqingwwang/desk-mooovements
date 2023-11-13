'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { TextField } from '@radix-ui/themes';

export const SearchBar: React.FC<{
  cities: { id: number; name: string | null }[];
}> = ({ cities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 0) {
      setSearchTerm(value);

      const matchingTerms = cities
        .map((city) => city.name)
        .filter(
          (name) => name && name.toLowerCase().includes(value.toLowerCase())
        ) as string[];

      setSuggestions(matchingTerms);
    } else {
      setSuggestions([]);
      setSearchTerm('');
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchTerm(term);
    setSuggestions([]);
    const selectedCity = cities.find(
      (city) => city?.name?.toLowerCase() === term.toLowerCase()
    );

    if (selectedCity) {
      router.push(`/cities/${selectedCity.id}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCity = cities.find(
      (city) => city?.name?.toLowerCase() === searchTerm.toLowerCase()
    );

    if (selectedCity) {
      router.push(`/cities/${selectedCity.id}`);
    }
  };

  return (
    <div className='searchmargintop mt-2 flex justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex opacity-70 transition-opacity duration-200 focus-within:opacity-90'
      >
        <div>
          <TextField.Root>
            <TextField.Input
              placeholder='Find a city...'
              size='2'
              className='bg-primaryLight mh-10 focus:ring-primaryDark rounded-l-md
            p-2 shadow-sm outline-none focus:ring-2
            focus:ring-opacity-50'
              value={searchTerm}
              onChange={handleInputChange}
              variant='soft'
              required
            />
          </TextField.Root>
          <div>
            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((term, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(term)}>
                    {term}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          className='bg-primaryLight max-h-10 flex-shrink-0 flex-grow-0 rounded-r-md px-3 py-2 '
          type='submit'
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};
