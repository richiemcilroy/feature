import { Disclosure } from '@headlessui/react';
import { ArrowCircleRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Logo from '@/components/icons/Logo';
import { useUser } from '@/utils/useUser';
import Link from 'next/link';

const Navbar = () => {

  const { user } = useUser();

  return (
    <div className="bg-white">
      <div className="py-8 wrapper">
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
              >
                <a>
                  <Logo className="h-5 md:h-7 w-auto"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {
              user ?
              <div className="flex-shrink-0">
                <Link
                  href="/dashboard"
                >  
                  <a
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-xs md:text-sm font-medium rounded-md text-white bg-primary shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    <span>Dashboard</span>
                    <ArrowCircleRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                  </a>
                </Link>
              </div>
              :
                <div className="flex-shrink-0">
                  <Link
                    href="/signin"
                  >                  
                    <a
                      className="text-primary mr-4 text-xs md:text-sm"
                    >
                      <span>Sign in</span>
                    </a>
                  </Link>
                  <Link
                    href="/signup"
                  >  
                    <a
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-xs md:text-sm font-medium rounded-md text-white bg-primary shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      <span>Get Started</span>
                      <ArrowCircleRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                    </a>
                  </Link>
                </div>        
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
