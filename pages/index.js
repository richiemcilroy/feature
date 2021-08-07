import Pricing from '@/components/Pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import { StarIcon } from '@heroicons/react/solid';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Index({ products }) {
  return(
    <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-28">
        <div className="wrapper lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div>
              <div>
                <a href="https://supabase.io/blog/2021/07/30/1-the-supabase-hackathon" target="_blank" className="inline-flex space-x-4">
                  <span className="rounded px-2.5 py-1 text-xs font-semibold text-white bg-green tracking-wide uppercase">
                    Supabase Hackathon Submission
                  </span>
                </a>
              </div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Add new features to your website in minutes with no-code
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  <span class="font-semibold">Feature.so</span> is a time saving, no-code tool that allows you to add new features to your site in minutes. Simply verify your domain and use our powerful in-browser visualizer to add your feature.
                </p>
              </div>
              <Link
                href="/signup"
              >  
                <a
                  className="mt-5 relative inline-flex items-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <span>Get Started</span>
                  <ArrowCircleRightIcon className="ml-4 h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
              </svg>
            </div>
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
              <img
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src="/platform-screenshot.png"
                alt="Feature.so Screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
