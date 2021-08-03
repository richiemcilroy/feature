import { useUser } from '@/utils/useUser';
import { useRouter } from 'next/router';
import { useState, Fragment } from 'react';
import {
  CogIcon,
  DocumentReportIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function AdminNavItems() {
  const { signOut } = useUser();
  const router = useRouter();
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Features', href: '/dashboard/features', icon: ShieldCheckIcon },
    { name: 'Projects', href: '#', icon: ScaleIcon },
    { name: 'Analytics', href: '#', icon: DocumentReportIcon },
  ];
  const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon }
  ];
  const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' }
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [selected, setSelected] = useState(people[0]);

  return(
    <>
      <nav className="mt-8 flex-1 flex flex-col divide-y-2 divide-primary-2 overflow-y-auto" aria-label="Sidebar">
        <div className="px-4 space-y-1 pb-6">
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="top-0 left-0 absolute rounded-lg z-20 w-full bg-white max-h-60 pt-1 text-base overflow-auto focus:outline-none sm:text-sm"
                    >
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-gray-900' : 'text-primary',
                              'cursor-pointer select-none relative py-2 pl-8 pr-4'
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-primary',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                      <a href="#" className="block text-primary bg-gray-300 cursor-pointer select-none relative py-3 pl-8 pr-4 hover:bg-gray-900 hover:text-white">
                        + Create project
                      </a>
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="px-4 space-y-1 pt-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                router?.route === item.href ? 'bg-primary-2 text-white' : 'text-white hover:text-white hover:bg-primary-2',
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
          <div className="px-4 space-y-1">
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
            <a
              onClick={() => signOut()}
              href="#"
              className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-primary-2"
            >
              <LogoutIcon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
              Sign out
            </a>
          </div>
        </div>
      </nav>
    </>
  )
};