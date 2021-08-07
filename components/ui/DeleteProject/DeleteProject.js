import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser, deleteProject } from '@/utils/useUser';
import { CheckCircleIcon } from '@heroicons/react/solid';

export default function DeleteProject() {
  const router = useRouter();
  const { userProjects } = useUser();
  const [selectedProject, setSelectedProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')){
      await deleteProject(id).then((result) => {
        if(result === "Success"){
          setErrorMessage(false);
          router.reload('/dashboard');
        } else {
          setErrorMessage(true);
        }
      });
    }
  };

  useEffect(() => {
    if(userProjects){
      
      if(userProjects?.length > 0 && router?.query?.projectName){
        const filteredProject = userProjects?.filter(project => project?.project_domain === router?.query?.projectName);

        if(filteredProject !== null){
          setSelectedProject(filteredProject[0]);
        }
      }
    }

  }, [userProjects, router]);

  return (
    <div className="bg-white shadow sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete project</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Once you delete your project, you will lose all data associated with it.</p>
        </div>
        <div className="mt-5">
          <button
            onClick={e=>{ handleDelete(selectedProject?.project_id) }}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-red hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  );
}