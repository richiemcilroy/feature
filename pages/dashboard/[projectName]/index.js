import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  const stats = [
    { name: 'Impressions', stat: '0' },
    { name: 'Form Submissions', stat: '0' },
    { name: 'Clicks', stat: '0' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-4 sm:tracking-tight">
        Dashboard Inside
      </h1>
      <div className="mb-8 text-white bg-primary-2 rounded-lg shadow-lg animate-enter">
        <div className="px-4 py-7">
          <h2 className="mb-2 text-lg">Waiting for data <span className="h-2 w-2 bg-white inline-block rounded-full m-0.5 mx-2 animate-pulse" />
          </h2>
          <p className="text-gray-300">Add the following script to your <b>head</b> tag. Then, visit your website. </p>
        </div>
        <div className="px-4 py-4 rounded-b-lg font-mono text-sm text-gray-200 bg-gray-900">&lt;script async src="https://feature.so/go.js"&gt;&lt;/script&gt;</div>
      </div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
      <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}