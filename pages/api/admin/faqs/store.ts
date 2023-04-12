import nc from '@/config/nc';
import { faq } from '@/models/faq';
import { validator } from '@/config/validator';

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
