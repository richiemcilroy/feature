import { getUserFromId } from '@/utils/useDatabase';
import Cors from 'cors';
import jwt_decode from "jwt-decode";
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

  const body = req.body;

  try {

    let tokenExpired = true;
    
    console.log(body);
    
    const decoded = body?.access_token ? jwt_decode(body?.access_token) : null;

    if(decoded !== null){

      const dateToday = new Date();
      const hourAgo = Math.floor(new Date(dateToday.getTime() - (1000*60*60)) / 1000);

      if(hourAgo > decoded?.exp){
        tokenExpired = true;
      } else {
        tokenExpired = false;
      }

      if(tokenExpired === true){
        return res.status(500).json({ statusCode: 500, authConfirmed: false });
      }

      const projectVerified = await getUserFromId(body?.feature_id, decoded?.sub);

      console.log(projectVerified);

      if(projectVerified === 'verified'){
        return res.status(200).json({ token_confirmed: true, decoded_token: decoded, token_expired: tokenExpired });
      }

      return res.status(500).json({ statusCode: 500, authConfirmed: false });
      
    }

    return res.status(500).json({ statusCode: 500, authConfirmed: false });

  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ error: { statusCode: 500, authConfirmed: false } });

  }
};

export default confirmSession;