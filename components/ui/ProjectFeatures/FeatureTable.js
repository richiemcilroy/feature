import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingDots from '@/components/ui/LoadingDots';
import SideModal from '@/components/ui/SideModal';
import { UTCtoString } from '@/utils/helpers';
import { useUser, newFeature } from '@/utils/useUser';
import Bin from '@/components/icons/Bin';

export default function FeatureTable({type}) {
  const router = useRouter();
  const { userLoaded, user, userFinderLoaded, userProjects, userFeatures } = useUser();
  const [featureToggle, setFeatureToggle] = useState(false);
  const [existingFeatureToggle, setExistingFeatureToggle] = useState(false);
  const [existingFeatureDetails, setExistingFeatureDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [buttonToggle, setButtonToggle] = useState(false);

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setFeatureToggle(false);

    const formData = new FormData(e.target);
    const data = {};
 
    for (let entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    await newFeature(user, data).then((result) => {
      if(result === "Success"){
        setErrorMessage(false);
        router.reload(window.location.pathname);
      } else {
        setErrorMessage(true);
      }
    });

  };

  const handleChange = async (e) => {

    e.preventDefault();

    setExistingFeatureToggle(false);

    const formData = new FormData(e.target);
    const data = {};
 
    for (let entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    await editFeature(data).then((result) => {
      if(result === "Success"){
        setErrorMessage(false);
        router.reload(window.location.pathname);
      } else {
        setErrorMessage(true);
      }
    });

  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')){
      await deleteFeature(id).then((result) => {
        if(result === "Success"){
          setErrorMessage(false);
          router.reload(window.location.pathname);
        }
      });
    }
  };


  const handleFeatureToggle = (e) => {
    setExistingFeatureToggle(true);
    setExistingFeatureDetails(e);
    setButtonToggle(e?.feature_status);
  };

  return (
    <div className="bg-accents-8 h-full">
      <div>
        {!userLoaded ? (
            <div className="h-12 mb-6 flex justify-center align-center">
                <LoadingDots />
            </div>
        ) : (
          userFeatures !== null && userFeatures?.length > 0 ?
            <div className="flex flex-col">
              <div className="mb-4 w-full text-right px-6">
                <button 
                  onClick={e=>{ featureToggle === true ? setFeatureToggle(false) : setFeatureToggle(true) }}
                  className="inline-block px-5 py-2 font-medium text-white rounded-md bg-primary hover:bg-primary-2"
                >
                  Add feature
                </button>
              </div>
              <div className="overflow-x-auto">
                <div className="pb-10 lg:py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Feature name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date Created
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userFeatures.map((feature, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  <p>
                                    {feature?.feature_type}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{UTCtoString(feature?.created)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {
                                feature?.feature_status === true ?
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green text-white">
                                  Active
                                </span>
                                :
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800">
                                  Disabled
                                </span>      
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end">
                                <button onClick={e=>{ handleFeatureToggle(feature) }}>
                                  Edit
                                </button>
                                <button className="ml-4" onClick={e=>{ handleDelete(feature?.feature_id) }}>
                                  <Bin className="w-5 h-auto"/>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          :
            <div className="py-10 rounded-lg bg-white border-2 border-accents-5 border-dashed max-w-xl text-center">
              <p className="mb-3">You have no features.</p>
              <button 
                onClick={e=>{ featureToggle === true ? setFeatureToggle(false) : setFeatureToggle(true) }}
                className="inline-block px-5 py-2 font-medium text-white rounded-md bg-primary hover:bg-primary-2"
              >
                Add a feature
              </button>
            </div>
        )}
      </div>
      {
        featureToggle &&
        <SideModal
          setFeatureToggle={setFeatureToggle}
          title="Add Feature"
        >
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <input
                maxLength="40"
                required
                type="hidden"
                id="feature_type"
                name="feature_type"
                className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
            />
            <button 
              className="inline-block px-5 py-2 font-medium text-white rounded-md bg-primary hover:bg-primary-2"
            >
              Add new feature
            </button>
            {
              errorMessage &&
              <div className="bg-red text-center p-4 mt-5 rounded-lg">
                <p className="text-white text-sm font-medium">Error saving feature</p>
              </div>
            }
          </form>        
        </SideModal>
      }
      {
        existingFeatureToggle &&
        <SideModal
          setFeatureToggle={setExistingFeatureToggle}
          title="Edit Feature"
        >
          <form action="#" method="POST" onSubmit={handleChange}>
              <input
                  required
                  type="hidden"
                  id="feature_id"
                  name="feature_id"
                  value={existingFeatureDetails?.feature_id}
              />
              <label htmlFor="main_keyword" className="block text-sm font-medium text-gray-700">
                  Feature Type
              </label>
              <div className="mt-1">
                <input
                    maxLength="40"
                    required
                    type="text"
                    id="feature_type"
                    name="feature_type"
                    className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Your project/company/brand name"
                    defaultValue={existingFeatureDetails?.feature_type}
                />
              </div>
              <label htmlFor="main_keyword" className="block text-sm font-medium text-gray-700 mt-4">
                  Feature Status
              </label>
              <div className="mt-1">
                <input
                    required
                    type="hidden"
                    id="feature_status"
                    name="feature_status"
                    value={buttonToggle}
                />
                <button 
                  onClick={e=>{buttonToggle === true ? setButtonToggle(false) : setButtonToggle(true) }}
                  type="button" 
                  className={`${
                    buttonToggle ? 'bg-green' : 'bg-gray-200'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                >
                  <span className="sr-only">Use setting</span>
                  <span 
                    aria-hidden="true" 
                    className={`${
                      buttonToggle ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}  
                  />
                </button>
              </div>
              <button 
                className="mt-5 inline-block px-6 py-3 font-medium text-white rounded-md bg-tertiary"
              >
                Save
              </button>
              {
                errorMessage &&
                <div className="bg-red text-center p-4 mt-5 rounded-lg">
                  <p className="text-white text-sm font-medium">Error saving changes</p>
                </div>
              }
          </form>        
        </SideModal>
      }
    </div>
  );
}