import nc from '@/app/nc';
import { faq } from '@/models/faq';
import { sendResponse } from '@/app/validator';


//@ts-ignore
export default nc().get(async (req, res) => {


  sendResponse({ response: res }, async () => {

    const data = await faq.all({
      select: {
        title: true,
        content: true
      },
      orderBy: {
        priority: 'desc'
      }
    });

    return {
      faqs: [...data],
      message: 'Data retrieved'
    }

  });

});
