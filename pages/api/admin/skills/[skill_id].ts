import nc from '@/app/nc';
import { skill } from '@/models/skill';
import { validator, sendResponse } from '@/app/validator';

import parseArrayId from '@/helpers/parseArrayToId';

export default nc()
  .get(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.skill_id);
      const data = await skill.show({ id });

      return {
        skill: data,
      };
    });
  })
  .patch(async (req, res) =>
    validator(
      {
        body: req.body,
        response: res,
        model: 'skill',
      },
      async ({ title, tags, priority }) => {
        const id = Number(req.query.skill_id);
        const data = await skill.update({
          id,
          title,
          priority,
          tags: parseArrayId(tags),
        });

        return {
          skill: data,
          message: 'Skill Has been updated',
        };
      }
    )
  )
  .delete(async (req, res) => {
    sendResponse({ response: res }, async () => {
      const id = Number(req.query.skill_id);
      await skill.destroy({ id });

      return {
        message: 'Skill deleted successfully',
      };
    });
  });
