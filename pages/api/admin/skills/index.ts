import nc from '@/app/nc';
import { skill } from '@/models/skill';
import { sendResponse } from '@/app/validator';


//@ts-ignore
export default nc().get(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const data = await skill.all({
      orderBy: [
        { priority: 'desc' },
        { title: 'asc' }
      ],
      include: {
        tags: true
      }
    });

    return {
      skills: [...data],
    }

  });
});
