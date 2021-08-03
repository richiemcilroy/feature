import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingDots from '@/components/ui/LoadingDots';
import { useUser } from '@/utils/useUser';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { user, signIn } = useUser();

  const handleSignin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.'
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/admin');
    }
  }, [user]);

  if (!user)
    return (
      <div>
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
            </div>
            
            <form onSubmit={handleSignin} className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={e=>{setEmail(e.target.value)}}
                  />
                </div>
                {showPasswordInput && (
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none  focus:z-10 sm:text-sm"
                      placeholder="Password"
                      onChange={e=>{setPassword(e.target.value)}}
                    />
                  </div>     
                )}
              </div>

              <div className="text-center text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                  onClick={() => {
                    if (showPasswordInput) setPassword('');
                    setShowPasswordInput(!showPasswordInput);
                    setMessage({});
                  }}
                >
                  {`Or sign in with ${
                    showPasswordInput ? 'magic link' : 'password'
                  }.`}
                </a>
              </div>  

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  {showPasswordInput ? 'Sign in' : 'Send magic link'}
                </button>
              </div>

              <div className="mt-3 text-center text-sm">
                <span className="text-accents-2">Don't have an account?</span>
                {` `}
                <Link href="/signup">
                  <a className="text-accents-1 font-bold hover:underline cursor-pointer">
                    Sign up.
                  </a>
                </Link>
              </div>

              {message.content && (
                <div
                  className={`${
                    message.type === 'error' ? 'text-pink' : 'text-green'
                  } border ${
                    message.type === 'error' ? 'border-pink' : 'border-green'
                  } p-3`}
                >
                  {message.content}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
