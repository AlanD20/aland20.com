import nc from '@/config/nc';
import { tag } from '@/models/tag';
import { sendResponse } from '@/config/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    const data = await tag.all({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        strict: 'asc',
      },
    });

    return {
      tags: [...data],
      message: 'Data retrieved',
    };
  });
});
