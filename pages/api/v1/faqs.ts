import nc from '@/config/nc';
import { faq } from '@/models/faq';
import { sendResponse } from '@/config/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, async () => {
    const data = await faq.all({
      select: {
        title: true,
        content: true,
      },
      orderBy: {
        priority: 'desc',
      },
    });

    return {
      faqs: [...data],
      message: 'Data retrieved',
    };
  });
});
