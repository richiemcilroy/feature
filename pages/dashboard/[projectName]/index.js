import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@/utils/useUser';
import projectCheck from '@/utils/projectCheck';
import FeatureTable from '@/components/ui/ProjectFeatures/FeatureTable';
import ProjectStatus from '@/components/ui/ProjectStatus/ProjectStatus';

export default function Dashboard() {
  const router = useRouter();
  const { userFeatures } = useUser();
  let filteredUserFeatures = 0;
  projectCheck();

  if(userFeatures !== null){
    filteredUserFeatures = userFeatures?.filter(feature => feature?.project_domain === router?.query?.projectName)?.length;
  }

  const stats = [
    { name: 'Features', stat: filteredUserFeatures },
    { name: 'Impressions', stat: '0', comingSoon: true },
    { name: 'Clicks', stat: '0', comingSoon: true },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-1 sm:tracking-tight">
        Dashboard
      </h1>
      <a href={'https://'+router?.query?.projectName} target="_blank" className="mb-4 block text-md text-gray-500 hover:underline">{router?.query?.projectName}</a>
      <ProjectStatus/>
      <div>
        <h2 className="mt-10 text-lg leading-6 font-medium text-gray-900">Last 30 days</h2>
        <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 bg-white shadow-md rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name} {item.comingSoon && '(coming soon!)'}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-10"> 
        <h2 className="text-3xl font-extrabold text-primary mb-4 sm:tracking-tight">
          Features
        </h2>
        <FeatureTable/>
      </div>
    </div>
  );
}