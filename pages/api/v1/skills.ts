import nc from '@/app/nc';
import { skill } from '@/models/skill';
import { sendResponse } from '@/app/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    const data = await skill.all({
      select: {
        title: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        priority: 'desc',
      },
    });

    return {
      skills: [...data],
      message: 'Data retrieved',
    };
  });
});
