import nc from '@/app/nc';
import { skill } from '@/models/skill';
import { validator } from '@/app/validator';
import parseArrayId from '@/helpers/parseArrayToId';

export default nc().post(async (req, res) =>
  validator(
    {
      body: req.body,
      response: res,
      model: 'skill',
    },
    async ({ title, tags, priority }) => {
      const created = await skill.store({
        title,
        priority,
        tags: parseArrayId(tags),
      });

      return {
        ...created,
        message: 'Skill Added!',
      };
    }
  )
);
