import nc from '@/app/nc';
import { faq } from '@/models/faq';
import { sendResponse } from '@/app/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    const data = await faq.all({
      orderBy: [{ priority: 'desc' }, { title: 'asc' }],
    });

    return {
      faqs: [...data],
    };
  });
});
