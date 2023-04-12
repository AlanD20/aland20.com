import nc from '@/config/nc';
import { faq } from '@/models/faq';
import { sendResponse } from '@/config/validator';

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
