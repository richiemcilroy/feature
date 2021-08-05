import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingDots from '@/components/ui/LoadingDots';
import SideModal from '@/components/ui/SideModal';
import { UTCtoString } from '@/utils/helpers';
import { capitalizeString } from '@/utils/helpers';
import { useUser, newFeature, deleteFeature } from '@/utils/useUser';
import Bin from '@/components/icons/Bin';
import {
  CalendarIcon,
  ClockIcon,
  PhotographIcon,
  TableIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

export default function FeatureTable({type}) {
  const router = useRouter();
  const { userLoaded, user, session, userFinderLoaded, userFeatures } = useUser();
  const [featureToggle, setFeatureToggle] = useState(false);
  const [existingFeatureToggle, setExistingFeatureToggle] = useState(false);
  const [existingFeatureDetails, setExistingFeatureDetails] = useState(null);
  const [newFeatureDetails, setNewFeatureDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [buttonToggle, setButtonToggle] = useState(false);

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user]);

  const items = [
    {
      title: 'Create a content section',
      type: 'content-section',
      description: 'Add a custom content section to your website',
      icon: ViewListIcon,
      background: 'bg-primary-2',
      link: ''+router?.asPath+'/content-section'
    },
    {
      title: 'Create a contact form',
      type: 'contact-form',
      description: 'Start receiving enquiries in minutes with our plug and play contact form',
      icon: CalendarIcon,
      background: 'bg-primary-2',
      link: ''+router?.asPath+'/contact-form'
    }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  

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

  const handleNewFeatureToggle = (e) => {
    setFeatureToggle(true);
    setNewFeatureDetails([capitalizeString(e.replace('-',' ')), e]);
  };

  const handleLocationSet = (e) => {
    window.open('https://'+router?.query?.projectName+'?featureEditor=1&accessToken='+session?.access_token+'','_blank');
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
            <div>            
              <div className="flex flex-col">
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
                              Label
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Feature type
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
                              Location
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
                                      {feature?.feature_label}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">
                                    <p>
                                      {capitalizeString(feature?.feature_type.replace('-',' '))}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{UTCtoString(feature?.created)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">
                                    {
                                      feature?.feature_data === null ? 
                                        <button onClick={e=>{handleLocationSet(feature?.feature_id)}} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red text-white">
                                          Add to site
                                        </button> 
                                      : 
                                        feature?.feature_data
                                    }
                                  </div>
                                </div>
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
              <ul role="list" className="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {items.map((item, itemIdx) => (
                  <li onClick={e=>{ handleNewFeatureToggle(item.type) }} key={itemIdx} className="flow-root">
                    <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                      <div
                        className={classNames(
                          item.background,
                          'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                        )}
                      >
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <button className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {item.title}
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          :
            <div>
              <p className="mt-1 text-sm text-gray-500">
                You haven’t added any features to your website yet. Get started by selecting from one of the templates below.
              </p>
              <ul role="list" className="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {items.map((item, itemIdx) => (
                  <li onClick={e=>{ handleNewFeatureToggle(item.type) }} key={itemIdx} className="flow-root">
                    <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                      <div
                        className={classNames(
                          item.background,
                          'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                        )}
                      >
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <button className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {item.title}
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        )}
      </div>
      {
        featureToggle &&
        <SideModal
          setFeatureToggle={setFeatureToggle}
          title={'Add a new '+newFeatureDetails[0]+' feature to your website'}
        >
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <input
                required
                type="hidden"
                id="project_domain"
                name="project_domain"
                className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={router?.query?.projectName}
            />            
            <input
                required
                type="hidden"
                id="feature_type"
                name="feature_type"
                className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={newFeatureDetails[1]}
            />
            <label htmlFor="feature_label" className="block text-sm font-medium text-gray-700 mt-4">
                Feature Label
            </label>
            <div className="mt-1">
              <input
                  maxLength="40"
                  required
                  type="text"
                  id="feature_label"
                  name="feature_label"
                  className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="E.g. where you are placing the feature"
                  defaultValue={''}
              />
            </div>
            <button 
              className="mt-5 inline-block px-5 py-2 font-medium text-white rounded-md bg-primary hover:bg-primary-2"
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