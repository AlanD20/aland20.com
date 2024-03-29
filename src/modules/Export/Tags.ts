import { tag } from '@/models/tag';
import { exportToFile } from './ExportToTSFile';

export const exportTags = async () => {
  const tags = await tag.all({
    select: {
      strict: true,
      name: true,
    },
    orderBy: {},
  });

  return exportToFile('tags', tags);
};
