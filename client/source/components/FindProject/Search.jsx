import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const Search = () => {
  return (
    <form className='col-span-4'>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true"  />
            </div>
            <input type="search" id="default-search" class="block w-full p-2.5 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
        </div>
    </form>
  )
};
