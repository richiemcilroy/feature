import { useState } from 'react';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

export default function SimpleNav() {
  return(
    <nav className="py-5 flex justify-between items-center wrapper bg-transparent">
      <Link href="/">
        <a>
          <Logo className="h-7 w-auto mx-auto"/>
        </a>
      </Link>
      <a
        onClick={() => signOut()}
        href="#"
        className="underline text-md"
      >
        Sign out
      </a>
    </nav>
  )
};