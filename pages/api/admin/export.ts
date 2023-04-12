import nc from '@/config/nc';
import { sendResponse } from '@/config/validator';
import { createExportDir } from '@/modules/Export/ExportToTSFile';
import { exportFaqs } from '@/modules/Export/Faqs';
import { exportProjects } from '@/modules/Export/Projects';
import { exportSkills } from '@/modules/Export/Skills';
import { exportTags } from '@/modules/Export/Tags';

// @ts-ignore
export default nc().post((req, res) => {
  sendResponse({ response: res }, async () => {
    Promise.all([
      await createExportDir(),
      await exportProjects(),
      await exportFaqs(),
      await exportSkills(),
      await exportTags(),
    ]);
    return {
      message: 'Export successful!',
    };
  });
});
