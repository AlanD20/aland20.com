import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import middlewareAuth from './middlewareAuth';
import middlewareCors from './middlewareCors';
import cors from 'cors';


const handler = () => {

  return nc<NextApiRequest, NextApiResponse>({
    // @ts-ignore
    onError: (err, req, res, next) => {
      // console.error(err.stack);
      res.status(500).json({
        message: '' + err,
        status: 'failed',
        code: 500
      });
    },
    // @ts-ignore
    onNoMatch: (req, res) => {
      res.status(404).json({
        message: 'Method is not allowed!',
        status: 'failed',
        code: 404
      });
    },
  }).use('/api', cors({ origin: '*' }))
    // Allow only specified origins
    .use('/api', middlewareCors)
    // Specifying which route requires Auth middleware
    .use('/api/admin', middlewareAuth);

}

export default handler;
