import nc from '@/app/nc';
import { tag } from '@/models/tag';
import { validator } from '@/app/validator';

export default nc().post(async (req, res) =>
  validator(
    {
      body: req.body,
      response: res,
      model: 'tag',
    },
    async ({ name }) => {
      const created = await tag.store({ name });

      return {
        ...created,
        message: 'Tag Added!',
      };
    }
  )
);
