import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import FeatureTable from '@/components/ui/ProjectFeatures/FeatureTable';

export default function ContentSection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();

  const people = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  ];

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  console.log(router);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-4 sm:tracking-tight">
        Content Section
      </h1>
      <FeatureTable type="content-section"/>
    </div>
  );
}