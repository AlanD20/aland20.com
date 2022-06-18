import config from '@config';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default function middlewareCors(
  req: NextApiRequest,
  res: NextApiResponse,
  next
) {
  const origin = req.headers.origin ?? '';

  if (!config.allowedOrigins.includes(origin)) {
    return res.status(403).json({
      message: 'Origin is not allowed',
      status: 'failed',
      code: 403,
    });
  }

  // Must revalidate every API response
  res.setHeader(
    'Cache-Control',
    'public; no-cache; no-store; must-revalidate;'
  );

  next();
}
