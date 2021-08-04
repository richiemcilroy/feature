import { verifyProject } from '@/utils/useDatabase';
import { getURL } from '@/utils/helpers';

const projectDetails = async (req, res) => {
  if (req.method === 'GET') {
    const headers = req.headers;

    try {
      const projectVerify = await verifyProject(
        headers?.host
      );
      console.log(headers?.host);
      console.log(projectVerify);
      return res.status(200).json({ verified: true });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { statusCode: 500, verified: false } });

    }
  }
};

export default projectDetails;