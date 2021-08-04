import { useUser } from '@/utils/useUser';
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import {
  CogIcon,
  DocumentReportIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import projectCheck from '@/utils/projectCheck';

export default function AdminNavItems() {
  const [userProjectDetails, setUserProjectDetails] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const { userProjects, signOut } = useUser();
  const router = useRouter();
  projectCheck('inner');

  useEffect(() => {
    if(userProjects){
      setUserProjectDetails(userProjects);
      
      if(userProjects?.length > 0 && router?.query?.projectName){
        const filteredProject = userProjects?.filter(project => project?.project_domain === router?.query?.projectName);

        if(filteredProject !== null){
          setSelectedProject(filteredProject[0]);
        }
      }
    }

  }, [userProjects, userProjectDetails, router]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/'+selectedProject?.project_domain+'', icon: HomeIcon },
    { name: 'Features', href: '/dashboard/'+selectedProject?.project_domain+'/features', icon: ShieldCheckIcon },
    { name: 'Analytics', href: '#', icon: DocumentReportIcon },
    { name: 'Settings', href: '/dashboard/'+selectedProject?.project_domain+'/settings', icon: CogIcon },
  ];
  const secondaryNavigation = [
    { name: 'Account', href: '/account', icon: UserIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return(
    <>
      <nav className="mt-8 flex-1 flex flex-col divide-y-2 divide-primary-2 overflow-y-auto" aria-label="Sidebar">
        <div className="px-4 space-y-1 pb-6">
          <Listbox onChange={value=>{router.replace('/dashboard/'+value?.project_domain+'')}} value={selectedProject?.project_domain}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md font-semibold shadow-sm pl-3 pr-10 py-2 flex text-left cursor-pointer focus:outline-none sm:text-sm">
                    <span className="relative w-5 h-5 rounded-full block mr-2">
                      {
                        selectedProject?.project_domain &&
                        <Image src={'https://s2.googleusercontent.com/s2/favicons?domain='+selectedProject?.project_domain+''} objectFit='contain' layout='fill' />
                      }
                    </span>
                    <span className="block truncate">{selectedProject?.project_name}</span>
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
                      {userProjectDetails?.map((project) => (
                        <Listbox.Option
                          key={project?.project_id}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-200' : 'text-primary',
                              'cursor-pointer select-none relative py-2 px-5'
                            )
                          }
                          value={project}
                        >
                          {({ selected, active }) => (
                            <>
                            <div className="flex">
                              <span className="relative w-5 h-5 rounded-full block mr-2">
                                {
                                  selectedProject?.project_domain &&
                                  <Image src={'https://s2.googleusercontent.com/s2/favicons?domain='+selectedProject?.project_domain+''} objectFit='contain' layout='fill' />
                                }
                              </span>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {project?.project_name}
                              </span>
                            </div>

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
                      <a href="/create-project" className="block bg-gray-100 cursor-pointer select-none relative py-3 px-5 hover:bg-gray-200">
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
                router?.asPath === item.href ? 'bg-primary-2 text-white' : 'text-white hover:text-white hover:bg-primary-2',
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