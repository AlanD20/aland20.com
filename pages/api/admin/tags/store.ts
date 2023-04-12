import nc from '@/config/nc';
import { tag } from '@/models/tag';
import { validator } from '@/config/validator';

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
