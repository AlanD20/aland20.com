import nc from '@/app/nc'
import { project } from '@/models/project';
import { validator } from '@/app/validator';
import { sendResponse } from '@/app/validator';
import parseArrayId from '@/helpers/parseArrayToId';


export default nc().get(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const id = Number(req.query.project_id);
    const data = await project.show({ id });

    return {
      project: data,
    }
  });

}).patch(async (req, res) => {

  return await validator({
    body: req.body,
    response: res,
    model: 'project'

  }, async ({
    title, content, sourceLink, createdDate,
    completedDate, previewLink, tags, priority
  }) => {

    const id = Number(req.query.project_id);
    const data = await project.update({
      id, title, content, sourceLink,
      createdDate, completedDate, previewLink, priority,
      tags: parseArrayId(tags)
    });

    return {
      project: data,
      message: 'Project Has been updated',
    }
  });

}).delete(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const id = Number(req.query.project_id);
    await project.destroy({ id });

    return {
      message: 'Project deleted successfully'
    }
  });

});
