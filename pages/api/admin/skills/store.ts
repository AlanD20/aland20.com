import nc from '@/config/nc';
import { skill } from '@/models/skill';
import { validator } from '@/config/validator';
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
