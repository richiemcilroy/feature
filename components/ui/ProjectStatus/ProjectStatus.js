import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { CheckCircleIcon } from '@heroicons/react/solid';
import LoadingDots from '@/components/ui/LoadingDots';

export default function ProjectStatus() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userProjects } = useUser();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if(userProjects){
      
      if(userProjects?.length > 0 && router?.query?.projectName){
        const filteredProject = userProjects?.filter(project => project?.project_domain === router?.query?.projectName);

        console.log(filteredProject)

        if(filteredProject !== null){
          setSelectedProject(filteredProject[0]);
        }
      }

      setLoading(false);
    }

  }, [userProjects, router]);

  return (
    <div>
      { 
        loading ?
          <LoadingDots />
        :
          selectedProject?.project_verified === false ?
            <div className="text-white bg-primary-2 rounded-lg shadow-lg animate-enter">
              <div className="px-4 py-7">
                <h3 className="mb-2 text-lg">Waiting for data <span className="h-2 w-2 bg-white inline-block rounded-full m-0.5 mx-2 animate-pulse" />
                </h3>
                <p className="text-gray-300">Add the following script to your <b>head</b> tag. Then, visit your website. You may need to refresh this page once done.</p>
              </div>
              <div className="px-4 py-4 rounded-b-lg font-mono text-sm text-gray-200 bg-gray-900">&lt;script async src="https://feature.so/go.js"&gt;&lt;/script&gt;</div>
            </div>
          :
            <div className="rounded-full bg-primary-2 py-3 px-6 inline-flex">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-white">Project domain verified</p>
                </div>
              </div>
            </div>
      }
    </div>
  );
}