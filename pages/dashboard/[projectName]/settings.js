import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@/utils/useUser';
import projectCheck from '@/utils/projectCheck';
import DeleteProject from '@/components/ui/DeleteProject/DeleteProject';

export default function Dashboard() {
  const router = useRouter();
  const { userFeatures } = useUser();
  const [errorMessage, setErrorMessage] = useState(false);
  projectCheck();

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-1 sm:tracking-tight">
        Settings
      </h1>
      <a href={'https://'+router?.query?.projectName} target="_blank" className="mb-4 block text-md text-gray-500 hover:underline">{router?.query?.projectName}</a>
      <DeleteProject/>
      {
        errorMessage &&
        <div className="bg-red text-center p-4 mt-5 rounded-lg">
          <p className="text-white text-sm font-medium">Error saving changes</p>
        </div>
      }
    </div>
  );
}