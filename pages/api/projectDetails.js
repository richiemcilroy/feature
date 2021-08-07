import { getProject, getFeatures } from '@/utils/useDatabase';
import Cors from 'cors';
import { getURL } from '@/utils/helpers';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const projectDetails = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  const headers = req.headers;
  const body = req.body;
  let filteredReferer = null;

  console.log(headers);

  if(headers?.origin) {
    filteredReferer = headers.origin.replace(/(^\w+:|^)\/\//, '');

    console.log(filteredReferer);

  } else {
    return res.status(500).json({ statusCode: 500, referer: false });
  }

  try {
    if(filteredReferer !== null){

      const projectVerify = await getProject(filteredReferer);

      console.log(projectVerify)
      
      if(projectVerify === "error"){
        return res.status(500).json({ statusCode: 500, verified: false });
      } else {

        const projectFeatures = await getFeatures(filteredReferer);

        if(projectFeatures === "error"){
          return res.status(500).json({ statusCode: 500, verified: true });

        } else {
          const projectFeaturesFiltered = projectFeatures.filter(feature => feature.feature_status === true);

          if(projectFeaturesFiltered.length > 0){

            return res.status(200).json({ verified: true, feature_data: projectFeatures });
          } else {

            return res.status(500).json({ statusCode: 500, verified: true });
          }

        }
      }

    } else {

      return res.status(500).json({ statusCode: 500, verified: false });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: { statusCode: 500, verified: false } });

  }
};

export default projectDetails;