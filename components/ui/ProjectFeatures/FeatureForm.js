import { useRouter } from 'next/router';

export default function FeatureForm(props) {
  const router = useRouter();
  
  return(
    <form action="#" method="POST" onSubmit={props?.handleSubmit}>
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
          defaultValue={props?.newFeatureDetails[1]}
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
        props?.errorMessage &&
        <div className="bg-red text-center p-4 mt-5 rounded-lg">
          <p className="text-white text-sm font-medium">Error saving feature</p>
        </div>
      }
    </form>
  )
};