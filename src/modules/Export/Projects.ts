import moment from 'moment';
import { project } from '@/models/project';
import { exportToFile } from './ExportToTSFile';

export const exportProjects = async () => {
  let projects = await project.all({
    select: {
      priority: true,
      title: true,
      content: true,
      sourceLink: true,
      previewLink: true,
      createdDate: true,
      completedDate: true,
      tags: {
        select: {
          id: true,
        },
      },
    },
  });
  projects = projects.map((p) => ({
    ...p,
    createdDate: moment(p.createdDate).format('YYYY-MM-DD'),
    completedDate: moment(p.completedDate).format('YYYY-MM-DD'),
  }));

  return exportToFile('projects', projects);
};
