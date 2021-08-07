import { useRouter } from 'next/router';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export default function FeatureForm(props) {
  const router = useRouter();
  const [textColor, setTextColor] = useColor("hex", "#000000");
  const [backgroundColor, setBackgroundColor] = useColor("hex", "#ffffff");
  const featureData = props?.existingFeatureDetails?.feature_data ? JSON.parse(props?.existingFeatureDetails?.feature_data) : null;
  const featureType = props?.existingFeatureDetails?.feature_type ? props?.existingFeatureDetails?.feature_type : props?.type;
  return(
    <form className="pb-12" action="#" method="POST" onSubmit={props?.handleSubmit}>
      {
        props?.existingFeatureDetails !== null &&
        <input
            required
            type="hidden"
            id="feature_id"
            name="feature_id"
            value={props?.existingFeatureDetails?.feature_id}
        />
      }
      <input
          required
          type="hidden"
          id="project_domain"
          name="project_domain"
          defaultValue={router?.query?.projectName}
      />    
      {
        props?.existingFeatureDetails !== null ?
          <input
              required
              type="hidden"
              id="feature_type"
              name="feature_type"
              defaultValue={props?.existingFeatureDetails?.feature_type}
          />
        :
          <input
              required
              type="hidden"
              id="feature_type"
              name="feature_type"
              defaultValue={props?.newFeatureDetails[1]}
          />
      }        
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
            defaultValue={props?.existingFeatureDetails?.feature_label ? props?.existingFeatureDetails?.feature_label : ''}
        />
      </div>
      {
        featureType === 'content-section' &&
        <div>
          <label htmlFor="section_title" className="block text-sm font-medium text-gray-700 mt-4">
              Section Title
          </label>
          <div className="mt-1">
            <input
                maxLength="180"
                required
                type="text"
                id="section_title"
                name="section_title"
                className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="This is the section title"
                defaultValue={featureData?.section_title ? featureData?.section_title : ''}
            />
          </div> 
          <label htmlFor="section_content" className="block text-sm font-medium text-gray-700 mt-4">
              Section Content
          </label>
          <div className="mt-1">
            <textarea
                maxLength="1200"
                required
                id="section_content"
                name="section_content"
                rows={4}
                className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 mt-1 p-6 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="This is the section content, which appears below the section title."
                defaultValue={featureData?.section_content ? featureData?.section_content : ''}
            />
          </div> 
          <label htmlFor="section_content" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
              Section Background Color
          </label>
            <input
              required
              type="hidden"
              id="background_color"
              name="background_color"
              defaultValue={backgroundColor?.hex}
            />
          <ColorPicker width={300} height={100} color={backgroundColor} onChange={setBackgroundColor} hideHSV hideRGB />
          <label htmlFor="section_content" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
              Section Text Color
          </label>
            <input
              required
              type="hidden"
              id="text_color"
              name="text_color"
              defaultValue={textColor?.hex}
            />
          <ColorPicker width={300} height={100} color={textColor} onChange={setTextColor} hideHSV hideRGB />
        </div>
      }
      <button 
        className="mt-10 inline-block px-5 py-2 font-medium text-white rounded-md bg-primary hover:bg-primary-2"
      >
        { props?.existingFeatureDetails !== null ? 'Save Changes' : 'Preview on site' }
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