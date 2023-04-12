import nc from '@/config/nc';
import { project } from '@/models/project';
import { sendResponse } from '@/config/validator';
import CustomDirective from '@/modules/CustomDirectives/CustomDirective';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    let data = await project.all({
      select: {
        title: true,
        content: true,
        sourceLink: true,
        previewLink: true,
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

    data = data.map((p) => ({
      ...p,
      content: CustomDirective(p.content),
    }));

    return {
      projects: [...data],
      message: 'Data retrieved',
    };
  });
});
