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
import FeatureTable from '@/components/ui/ProjectFeatures/FeatureTable';

export default function Features() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();

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
      <FeatureTable />
    </div>
  );
}