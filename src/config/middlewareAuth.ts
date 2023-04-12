import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function middlewareAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // Make sure to return, otherwise, it continue the process.
    return res.status(401).json({
      message: 'You are not authorized to perform the action!',
      status: 'unauthorized',
      code: 401,
    });
  }

  next();
}
