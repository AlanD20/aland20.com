import nc from '@/app/nc';
import { tag } from '@/models/tag';
import { validator } from '@/app/validator';
import { sendResponse } from '@/app/validator';


export default nc().get(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const id = Number(req.query.tag_id);
    const data = await tag.show({ id });

    return {
      tag: data
    }
  });

}).patch(async (req, res) => {

  return await validator({
    body: req.body,
    response: res,
    model: 'tag'

  }, async ({ name }) => {

    const id = Number(req.query.tag_id);
    const data = await tag.update({ id, name });

    return {
      tag: data,
      message: 'Tag Has been updated',
    }
  });

}).delete(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const id = Number(req.query.tag_id);
    await tag.destroy({ id });

    return {
      message: 'Tag deleted successfully'
    }
  });

});
