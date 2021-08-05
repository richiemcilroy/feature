import { getProject } from '@/utils/useDatabase';
import Cors from 'cors';
import { getURL } from '@/utils/helpers';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST']
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

const confirmSession = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  const headers = req.headers;
  const body = req.body;

  try {
    
    console.log(body);

    return res.status(500).json({ statusCode: 500, authConfirmed: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: { statusCode: 500, verified: false } });

  }
};

export default confirmSession;