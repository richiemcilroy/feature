import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import AdminNavItems from '@/components/ui/AdminNavbar/AdminNavItems';

export default function AdminDesktopNav() {
  return(
    <>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-primary pt-8 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/">
                  <a className="block m-auto">
                    <Logo className="h-7 w-full" white/>
                  </a>
                </Link>
            </div>
            <AdminNavItems/>
          </div>
        </div>
      </div>
    </>
  )
};