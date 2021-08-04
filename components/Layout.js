import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AdminMobileNav from '@/components/ui/AdminNavbar/AdminMobileNav';
import AdminDesktopNav from '@/components/ui/AdminNavbar/AdminDesktopNav';
import SimpleNav from '@/components/ui/SimpleNav';

export default function Layout({ children, meta: pageMeta }) {
  const router = useRouter();
  const meta = {
    title: 'Next.js Subscription Starter',
    description: 'Brought to you by Vercel, Stripe, and Supabase.',
    cardImage: '/og.png',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://subscription-starter.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
  
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>
      </Head>
      {
        router.pathname === '/account' &&
          <SimpleNav />
        || router.pathname === '/create-project' &&
          <SimpleNav />
      }
      {
        router.pathname.indexOf('/dashboard') === -1 && router.pathname !== '/account' && router.pathname !== '/create-project' &&
        <Navbar />
      }
      {
        router.pathname.indexOf('/dashboard') === -1 ?
          <main id="skip">{children}</main>
        :
          <div className="h-screen flex overflow-hidden bg-gray-100">
            <AdminDesktopNav/>
            <div className="flex-1 overflow-auto focus:outline-none">
              <AdminMobileNav/>
              <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="wrapper pt-12">
                  {children}
                </div>
              </main>
            </div>
          </div>
      }
      {
        router.pathname.indexOf('/dashboard') === -1 && router.pathname !== '/account' && router.pathname !== '/create-project' &&
        <Footer />
      }
    </>
  );
}
