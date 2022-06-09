import nc from '@/app/nc';
import { project } from '@/models/project';
import { validator } from '@/app/validator';
import parseArrayId from '@/helpers/parseArrayToId';


export default nc().post(async (req, res) => {


  return await validator({
    body: req.body,
    response: res,
    model: 'project'

  }, async ({
    title, content, sourceLink, createdDate,
    completedDate, previewLink, tags, priority
  }) => {

    const created = await project.store({
      title, content, sourceLink,
      previewLink, priority,
      createdDate, completedDate,
      tags: parseArrayId(tags)
    });

    return {
      ...created,
      message: 'Project Added!'
    }
  });

});
