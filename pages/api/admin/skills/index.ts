import nc from '@/config/nc';
import { skill } from '@/models/skill';
import { sendResponse } from '@/config/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    const data = await skill.all({
      orderBy: [{ priority: 'desc' }, { title: 'asc' }],
      include: {
        tags: true,
      },
    });

    return {
      skills: [...data],
    };
  });
});
