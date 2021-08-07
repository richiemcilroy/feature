import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingDots from '@/components/ui/LoadingDots';
import SideModal from '@/components/ui/SideModal';
import { UTCtoString } from '@/utils/helpers';
import { capitalizeString } from '@/utils/helpers';
import { useUser, newFeature, editFeature, deleteFeature } from '@/utils/useUser';
import Bin from '@/components/icons/Bin';
import View from '@/components/icons/View';
import Edit from '@/components/icons/Edit';
import FeatureForm from '@/components/ui/ProjectFeatures/FeatureForm';
import {
  CalendarIcon,
  ClockIcon,
  PhotographIcon,
  TableIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

export default function FeatureTable() {
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

  const filteredUserFeatures = userFeatures?.filter(userFeature => userFeature?.project_domain === router?.query?.projectName);

  const items = [
    {
      title: 'Add a content section',
      type: 'content-section',
      description: 'Add a custom content section to your website',
      icon: ViewListIcon,
      background: 'bg-primary-2',
      link: ''+router?.asPath+'/content-section'
    },
    {
      title: 'Add a contact form',
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

    console.log(formData)

    const formData = new FormData(e.target);
    const data = {};
 
    for (let entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    await newFeature(user, data).then((result) => {
      if(result){
        setErrorMessage(false);
        window.open('https://'+router?.query?.projectName+'?featureEditor=1&featureId='+result[0].feature_id+'&accessToken='+session?.access_token+'','_blank');
      } else {
        setErrorMessage(true);
      }
    });

  };

  const handleChange = async (e) => {

    e.preventDefault();

    setFeatureToggle(false);

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
  };

  const handleNewFeatureToggle = (e) => {
    setFeatureToggle(true);
    setNewFeatureDetails([capitalizeString(e.replace('-',' ')), e]);
  };

  const handleLocationSet = (e) => {
    window.open('https://'+router?.query?.projectName+'?featureEditor=1&featureId='+e+'&accessToken='+session?.access_token+'','_blank');
  };

  return (
    <div className="bg-accents-8 h-full">
      <div>
        {!userLoaded ? (
            <div className="h-12 mb-6 flex justify-center align-center">
                <LoadingDots />
            </div>
        ) : (
          filteredUserFeatures !== null && filteredUserFeatures?.length > 0 ?
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
                          {filteredUserFeatures.map((feature, index) => (
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
                                {
                                  feature?.feature_status === true ?
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green text-white">
                                      Active
                                    </span>
                                  :
                                    <button onClick={e=>{handleLocationSet(feature?.feature_id)}} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red text-white">
                                      Add to site
                                    </button>  
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end">
                                  <button className="ml-4" onClick={e=>{ window.open('/embed/'+feature?.feature_id) }}>
                                    <View className="w-7 h-auto"/>
                                  </button>
                                  <button className="ml-4" onClick={e=>{ handleFeatureToggle(feature) }}>
                                    <Edit className="w-5 h-auto"/>
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
          <FeatureForm existingFeatureDetails={null} type={newFeatureDetails[1]} newFeatureDetails={newFeatureDetails} handleSubmit={handleSubmit}/>     
        </SideModal>
      }
      {
        existingFeatureToggle &&
        <SideModal
          setFeatureToggle={setExistingFeatureToggle}
          title="Edit Feature"
        >
          <FeatureForm existingFeatureDetails={existingFeatureDetails} newFeatureDetails={newFeatureDetails} handleSubmit={handleChange}/>   
        </SideModal>
      }
    </div>
  );
}