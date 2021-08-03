import { Disclosure } from '@headlessui/react';
import { ArrowCircleRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

const Navbar = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const navItemClass = "text-gray-500 hover:text-gray-900 items-center text-sm font-medium";

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="py-8 wrapper">
            <div className="flex justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    href="/"
                  >
                    <a>
                      <Logo className="h-10 w-auto"/>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <a
                  href="#"
                  className={navItemClass}
                >
                  Features
                </a>
                <a
                  href="#"
                  className={navItemClass}
                >
                  Pricing
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href="/signin"
                  >                  
                    <a
                      className="text-primary mr-4"
                    >
                      <span>Sign in</span>
                    </a>
                  </Link>
                  <Link
                    href="/signup"
                  >  
                    <a
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      <span>Sign Up</span>
                      <ArrowCircleRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <a
                href="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Team
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Projects
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
              >
                Calendar
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
