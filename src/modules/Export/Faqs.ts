import { faq } from '@/models/faq';
import { exportToFile } from './ExportToTSFile';

export const exportFaqs = async () => {
  const faqs = await faq.all({
    select: {
      title: true,
      content: true,
    },
  });

  return exportToFile('faqs', faqs);
};
