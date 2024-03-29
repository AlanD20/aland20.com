import nc from '@/config/nc';
import { faq } from '@/models/faq';
import { validator, sendResponse } from '@/config/validator';

export default nc()
  .get(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.faq_id);
      const data = await faq.show({ id });

      return {
        faq: data,
      };
    });
  })
  .patch(async (req, res) =>
    validator(
      {
        body: req.body,
        response: res,
        model: 'faq',
      },
      async ({ title, content, priority }) => {
        const id = Number(req.query.faq_id);
        const data = await faq.update({
          id,
          title,
          content,
          priority,
        });

        return {
          faq: data,
          message: 'Faq Has been updated',
        };
      }
    )
  )
  .delete(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.faq_id);
      await faq.destroy({ id });

      return {
        message: 'Faq Has been Deleted',
      };
    });
  });
