import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user]);

  return (
    <p>Admin</p>
  );
}