import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout({ children, meta: pageMeta }) {

  const Navbar = dynamic(() => import('@/components/ui/Navbar'));
  const Footer = dynamic(() => import('@/components/ui/Footer'));
  const AdminMobileNav = dynamic(() => import('@/components/ui/AdminNavbar/AdminMobileNav'));
  const AdminDesktopNav = dynamic(() => import('@/components/ui/AdminNavbar/AdminDesktopNav'));
  const SimpleNav = dynamic(() => import('@/components/ui/SimpleNav'));
  const router = useRouter();

  console.log(router);

  const meta = {
    title: 'Feature.so | Add new features to your website in minutes with no-code',
    description: 'Add new features to your website in minutes with no-code',
    cardImage: '/og.png',
    ...pageMeta
  };

  return (
    <>
      <Head>
      <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://feature.so`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Feature.so | Add new features to your website in minutes with no-code"/>
        <meta name="twitter:site" content="@feature_so"/>
        <meta name="twitter:description" content="Feature.so is a time saving, no-code tool that allows you to add new features to your site in minutes. Simply verify your domain and use our powerful in-browser visualliser to add your feature."/>
        <meta name="twitter:image" content="https://feature.so/og.png"/>
        <meta name="twitter:image:alt" content="Feature.so"/>
  
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>

        {
          router.pathname.indexOf('/embed') > -1 &&
          <script async src="/iframeResizer.contentWindow.min.js"></script>
        }

      </Head>
      {
        router.pathname === '/account' &&
          <SimpleNav />
        || router.pathname === '/create-project' &&
          <SimpleNav />
      }
      {
        router.pathname.indexOf('/dashboard') === -1 && router.pathname !== '/account' && router.pathname !== '/create-project' && router.pathname.indexOf('/embed') === -1 &&
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
        router.pathname.indexOf('/dashboard') === -1 && router.pathname !== '/account' && router.pathname !== '/create-project' && router.pathname.indexOf('/embed') === -1 &&
        <Footer />
      }
    </>
  );
}
