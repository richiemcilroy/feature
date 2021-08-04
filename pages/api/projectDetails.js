import { getProject } from '@/utils/useDatabase';
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
  const filteredReferer = headers.referer.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").replace(/\//g, "").replace(/\\/g, "-");

  console.log(filteredReferer);

  try {
    const projectVerify = await getProject(filteredReferer);
    console.log(projectVerify);
    return res.status(200).json({ verified: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: { statusCode: 500, verified: false } });

  }
};

export default projectDetails;