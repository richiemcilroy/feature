import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import {
  CalendarIcon,
  ClockIcon,
  PhotographIcon,
  TableIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { getURL } from '@/utils/helpers';

export default function Features() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();
  
  const items = [
    {
      title: 'Create a content section',
      description: 'Add a custom content section to your website',
      icon: ViewListIcon,
      background: 'bg-primary-2',
      link: ''+router?.asPath+'/content-section'
    },
    {
      title: 'Create a contact form',
      description: 'Start receiving enquiries in minutes with our plug and play contact form',
      icon: CalendarIcon,
      background: 'bg-primary-2',
      link: ''+router?.asPath+'/contact-form'
    }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-4 sm:tracking-tight">
        Features
      </h1>
      <div>
        <p className="mt-1 text-sm text-gray-500">
          You haven’t added any features to your website yet. Get started by selecting from one of the templates below.
        </p>
        <ul role="list" className="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="flow-root">
              <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                <div
                  className={classNames(
                    item.background,
                    'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                  )}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={item?.link} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}