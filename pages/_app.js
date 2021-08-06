import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import '@/assets/main.css';
import '@/assets/chrome-bug.css';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const UserContextProvider = dynamic(() =>
  import("@/utils/useUser").then((module) => module.UserContextProvider)
);
  const router = useRouter();

  console.log(router)

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <div>
      {
        router.pathname.indexOf('/embed') > -1 ?
          <Layout>
            <Component {...pageProps} />
          </Layout>
        :
          <UserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContextProvider>
      }
    </div>
  );
}
