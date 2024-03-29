import nc from '@/config/nc';
import { tag } from '@/models/tag';
import { validator, sendResponse } from '@/config/validator';

export default nc()
  .get(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.tag_id);
      const data = await tag.show({ id });

      return {
        tag: data,
      };
    });
  })
  .patch(async (req, res) =>
    validator(
      {
        body: req.body,
        response: res,
        model: 'tag',
      },
      async ({ name }) => {
        const id = Number(req.query.tag_id);
        const data = await tag.update({ id, name });

        return {
          tag: data,
          message: 'Tag Has been updated',
        };
      }
    )
  )
  .delete(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.tag_id);
      await tag.destroy({ id });

      return {
        message: 'Tag deleted successfully',
      };
    });
  });
