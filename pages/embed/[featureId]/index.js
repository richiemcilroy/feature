import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingDots from '@/components/ui/LoadingDots';

export default function EmbedFeature() {
  const [loaded, setLoaded] = useState(false);
  const [featureData, setFeatureData] = useState(null);
  const router = useRouter();
  const ContentFeature = dynamic(() => import('@/components/ui/ProjectFeatures/Features/ContentFeature'));

  const getFeatureData = async (featureId) => {
    try {
      const res = await fetch('/api/featureData', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature_id: featureId
        })
      }).then(function(response) {
        return response.json();
      }).then(function(data) {

        setFeatureData(JSON.parse(data?.feature_data));
        setLoaded(true);
        
        return data?.feature_data;
      });

    } catch (error) {
      
      console.log(error);
    }
  };

  useEffect(() => {
    if(featureData === null && router?.query?.featureId){
      const data = getFeatureData(router?.query?.featureId);
    }
  }, [getFeatureData, setFeatureData, loaded]);

  console.log(featureData);
  
  if(!loaded){
    return(
      <div className="flex justify-center pt-12">
        <LoadingDots/>
      </div>
    );

  } else {
    return(
     <div>
       {
         featureData?.feature_type === 'content-section' &&
         <ContentFeature data={featureData}/>
       }
     </div>
    )
  }
}