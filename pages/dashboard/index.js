import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import LoadingDots from '@/components/ui/LoadingDots';
import projectCheck from '@/utils/projectCheck';

export default function RootDashboard() {
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();
  projectCheck('root');

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  return (
    <div className="pt-12 flex justify-center">
      <LoadingDots/>
    </div>
  );
}