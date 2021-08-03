import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  ChevronDownIcon,
} from '@heroicons/react/solid';
import Logo from '@/components/icons/Logo';

export default function Layout({ children, meta: pageMeta }) {
  const router = useRouter();
  const meta = {
    title: 'Next.js Subscription Starter',
    description: 'Brought to you by Vercel, Stripe, and Supabase.',
    cardImage: '/og.png',
    ...pageMeta
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [
    { name: 'Admin', href: '/admin', icon: HomeIcon, current: true },
    { name: 'History', href: '#', icon: ClockIcon, current: false },
    { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
    { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
  ];
  const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://subscription-starter.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
  
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>
      </Head>
      {
        router.pathname.indexOf('/admin') === -1 && router.pathname !== '/account' &&
        <Navbar />
      }
      {
        router.pathname.indexOf('/admin') === -1 && router.pathname !== '/account' ?
          <main id="skip">{children}</main>
        :
          <div className="h-screen flex overflow-hidden bg-gray-100">
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                static
                className="fixed inset-0 flex z-40 lg:hidden"
                open={sidebarOpen}
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 flex items-center px-4">
                      <Link href="/">
                        <a className="block m-auto">
                          <Logo className="h-10 w-full"/>
                        </a>
                      </Link>
                    </div>
                    <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-white text-primary' : 'text-white hover:text-white hover:bg-cyan-600',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 pt-6">
                        <div className="px-2 space-y-1">
                          {secondaryNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                            >
                              <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </nav>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
              <div className="flex flex-col w-64">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow bg-primary pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <Link href="/">
                        <a className="block m-auto">
                          <Logo className="h-10 w-full" white/>
                        </a>
                      </Link>
                  </div>
                  <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-white text-primary' : 'text-white hover:text-white hover:bg-primary-2',
                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="px-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-primary-2"
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto focus:outline-none">
              <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                <button
                  className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex justify-center lg:justify-end w-full px-6">
                  <div className="flex-shrink-0 flex lg:hidden items-center px-4">
                    <Link href="/">
                      <a className="block m-auto">
                        <Logo className="h-10 w-full"/>
                      </a>
                    </Link>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                              <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                Account
                              </span>
                              <ChevronDownIcon
                                className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/account"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={() => signOut()}
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
              <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
      }
      {
        router.pathname.indexOf('/admin') === -1 && router.pathname !== '/account' &&
        <Footer />
      }
    </>
  );
}
