/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, FolderIcon, XMarkIcon, MagnifyingGlassIcon, CircleStackIcon, UserIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon as MagnifyingGlassIconSolid, FolderIcon as FolderIconSolid, CircleStackIcon as CircleStackIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const location = useLocation();
  const navigation = [
    { name: 'Find projects', current: location.pathname === '/', href: '/', icon: MagnifyingGlassIcon, iconSolid: MagnifyingGlassIconSolid },
    { name: 'My projects', current: location.pathname === '/my-projects', href: '/my-projects', icon: FolderIcon, iconSolid: FolderIconSolid },
    { name: 'Overview', current: location.pathname === '/overview', href: '/overview', icon: CircleStackIcon, iconSolid: CircleStackIconSolid },
    { name: 'Profile', current: location.pathname === '/profile', href: '/profile', icon: UserIcon, iconSolid: UserIconSolid },
  ];

  return (
    <Disclosure as="nav" className="bg-white mb-4">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src='./app_logo.png'
                    alt="Your Company"
                  />
                  <img
                    className="hidden w-60 h-auto mt-2.5 lg:block"
                    src="./app_logo.png"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block justify-center">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-500 transition',
                          'group flex items-center px-4 py-2.5 text-base font-medium rounded-3xl'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                         {
                            item.current ?
                            <item.iconSolid className='mr-2.5 flex-shrink-0 h-6 w-6' aria-hidden='true' />
                            :
                            <item.icon className='mr-2.5 flex-shrink-0 h-6 w-6' aria-hidden='true' />
                          }    
                          {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to='/chat'>
                  <button
                    type="button"
                    className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Link>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}