import { useEffect, useState } from 'react';
import { useUser } from '@/utils/useUser';
import { CheckIcon } from '@heroicons/react/outline';
import Testimonials from '@/components/Testimonials';

export default function Index() {
  const { userLoaded } = useUser();

  return(
    <div>
      <div className="lg:relative bg-gradient-to-b from-white via-primary-3 to-primary">
        <div className="wrapper relative z-10 pt-10 lg:pt-16 text-center">
          <div className="px-4 max-w-4xl sm:px-8 mx-auto relative">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl relative z-10">
              <span className="block xl:inline">Add new features to your website</span>{' '}
              <span className="block text-gray-600 xl:block">in minutes with no-code</span>
            </h1>
            <p className="mt-3 text-tertiary text-lg relative z-10">
            Feature.so is a time saving, no-code tool that allows you to add new features to your site in minutes. Simply verify your domain and use our powerful in-browser visualizer to add your new feature.
            </p>
            <div className="mt-12">
              <a
                href={userLoaded ? '/dashboard' : '/signup'}
                className="px-8 py-3 inline-block border border-transparent font-semibold rounded-md text-white bg-primary hover:bg-primary-2 transition-all hover:bg-primary-2 md:py-4 md:text-lg md:px-16"
              >
                {
                  userLoaded ? 'View Dashboard' : 'Get Started for Free'
                }
              </a>
            </div>
              {
                !userLoaded &&
                <p className="text-xs text-tertiary mt-4 block">No credit card required. Signup and add your first feature for free.</p>
              }    
              <div className="rounded-lg relative mt-20">
                <img
                  className="w-full shadow-xl rounded-tl-lg rounded-tr-lg"
                  src="/platform-screenshot.png"
                  alt="Feature.so Screenshot"
                />
            </div>
          </div>
        </div>
      </div>
    
      <Testimonials/>

    </div>
  )
}