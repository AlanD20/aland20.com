import nc from '@/app/nc';
import { project } from '@/models/project';
import { sendResponse } from '@/app/validator';


//@ts-ignore
export default nc().get(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const data = await project.all({
      orderBy: [
        { priority: 'desc' },
        { title: 'asc' }
      ],
      include: {
        tags: true
      }
    });

    return {
      projects: [...data],
    }

  });
});
