import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navigation = [
  { name: "Dashboard", href: "/home", current: false },
  { name: "Emotions", href: "/emotions", current: false },
  { name: "Emotion Capture", href: "/emotioncapturs", current: false },
  { name: "Voice Commands", href: "/voice", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBarHome({ toggleDarkMode, darkMode }) {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('');

  // Fetch the user's profile picture
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile/picture', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.profilePicture) {
          setProfilePic(data.profilePicture);
        } else {
          setProfilePic('https://via.placeholder.com/150'); // Default placeholder if no picture
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        setProfilePic('https://via.placeholder.com/150'); // Fallback in case of error
      }
    };

    fetchProfilePicture();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        // Clear any local user data (if needed) and redirect to login page
        setProfilePic('');
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Disclosure as="nav" className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className={`${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-black'} inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo and navigation */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 9.25L12 3l9 6.25v11.25A1.5 1.5 0 0119.5 21H4.5A1.5 1.5 0 013 20.5V9.25z' /%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 21V12h6v9' /%3E%3C/svg%3E"
                    alt="FeelHome AI"
                  />
                </div>

                {/* Navigation links */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? `${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`
                            : `${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-black'}`,
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side of navbar */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="mr-4">
                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Sun icon */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.707.707M4.05 4.05l-.707.707M21 12h-1M4 12H3m16.95 4.95l-.707-.707M4.05 19.95l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Moon icon */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c4.418 0 8 3.582 8 8 0 1.707-.525 3.293-1.415 4.585A7.978 7.978 0 0112 21c-4.418 0-8-3.582-8-8 0-1.707.525-3.293 1.415-4.585A7.978 7.978 0 0112 3z" />
                    </svg>
                  )}
                </button>

                {/* Notification button */}
                <button
                  type="button"
                  className={`${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-700 hover:text-black'} rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profilePic}
                        alt="User Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className={`${darkMode ? 'bg-gray-800' : 'bg-white'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile"
                          className={classNames(
                            active ? `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}` : '',
                            `${darkMode ? 'text-white' : 'text-gray-700'} block px-4 py-2 text-sm`
                          )}
                        >
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/settings"
                          className={classNames(
                            active ? `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}` : '',
                            `${darkMode ? 'text-white' : 'text-gray-700'} block px-4 py-2 text-sm`
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}` : '',
                            `${darkMode ? 'text-white' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} space-y-1 px-2 pt-2 pb-3`}>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? `${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-black'}`,
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
