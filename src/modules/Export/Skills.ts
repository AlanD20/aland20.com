import { skill } from '@/models/skill';
import { exportToFile } from './ExportToTSFile';

export const exportSkills = async () => {
  const skills = await skill.all({
    select: {
      priority: true,
      title: true,
      tags: {
        select: {
          id: true,
        },
      },
    },
  });

  return exportToFile('skills', skills);
};
