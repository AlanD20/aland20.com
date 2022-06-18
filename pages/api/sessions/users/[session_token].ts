// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { User } from '@prisma/client';
import { prisma } from '@/app/prisma';
import nc from '@/app/nc';

export default nc().post(async (req, res) => {
  const { session_token: sessionToken } = req.query;

  const user: User | null = await prisma.session
    .findUnique({
      where: {
        sessionToken: sessionToken as string,
      },
    })
    .user();

  res.status(200).json({
    ...user,
    status: 'success',
    code: 200,
  });
});
