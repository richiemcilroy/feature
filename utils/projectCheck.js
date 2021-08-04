import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from '@/utils/useUser';

export default function projectCheck(type) {
  const [userProjectDetails, setUserProjectDetails] = useState(null);
  const router = useRouter();
  const { user, userFinderLoaded, userProjects } = useUser();

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
    if(userProjects){
      setUserProjectDetails(userProjects)
    }
  }, [userFinderLoaded, user, userProjects]);

  if(userProjectDetails !== null && userProjectDetails?.length === 0){
    router.replace('/dashboard/create-project');
  }

  if(type === 'root'){    
    if(userProjectDetails !== null && userProjectDetails?.length > 0){
      router.replace('/dashboard/'+userProjectDetails[0]?.project_domain+'');
    }
  }

  if(type === 'inner'){    
    if(userProjectDetails?.length > 0 && router?.query?.projectName){
      const filteredProject = userProjects?.filter(project => project?.project_domain === router?.query?.projectName);
  
      if(filteredProject === null || filteredProject.length === 0){
        router.replace('/dashboard/'+userProjectDetails[0]?.project_domain+'');
      }
    }
  }

}