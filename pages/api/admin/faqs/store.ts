import nc from '@/app/nc';
import { faq } from '@/models/faq';
import { validator } from '@/app/validator';

export default nc().post(async (req, res) =>
  validator(
    {
      body: req.body,
      response: res,
      model: 'faq',
    },
    async ({ title, content, priority }) => {
      const created = await faq.store({
        title,
        content,
        priority,
      });

      return {
        ...created,
        message: 'FAQ Added!',
      };
    }
  )
);
