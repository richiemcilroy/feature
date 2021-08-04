import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser, newProject } from '@/utils/useUser';

export default function RootDashboard() {
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();
  const [errorMessage, setErrorMessage] = useState(false);
  const isValidDomain = require('is-valid-domain');

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
 
    for (let entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    await newProject(user, data).then((result) => {
      if(result === "Success"){
        setErrorMessage(false);
        router.replace("/dashboard/"+data?.project_domain+"");
      } else {
        setErrorMessage(true);
      }
    });

  };

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  return (
    <div className="bg-gray-100 min-h-screen h-full flex flex-col">
      <form className="flex-1 pt-12 space-y-8 divide-y divide-gray-200 wrapper h-full" action="#" method="POST" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 p-8 rounded-lg bg-white max-w-xl mx-auto shadow-md">
          <div>

            <h1 className="text-3xl font-extrabold text-primary mb-4 sm:tracking-tight text-center">
              Create a Project
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-12">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    required
                    type="text"
                    name="project_name"
                    id="project_name"
                    autoComplete="project_name"
                    className="flex-1 block w-full min-w-0 rounded-md focus:outline-none sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div className="sm:col-span-12">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Project URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    required
                    type="text"
                    name="project_domain"
                    id="project_domain"
                    autoComplete="project_domain"
                    className="flex-1 block w-full min-w-0 rounded-none focus:outline-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>


            </div>

            <div className="flex justify-end">
              <button
                className="mt-8 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span>Create Project</span>
              </button>
            </div>

            {
              errorMessage &&
              <div className="bg-red text-center p-4 mt-5 rounded-lg">
                <p className="text-white text-sm font-medium">Error creating project, please try again later</p>
              </div>
            }
          </div>
        </div>
      </form>
    </div>
  );
}