import nc from '@/app/nc'
import { sendResponse } from '@/app/validator';

//@ts-ignore
export default nc().get(async (req, res) => {

  sendResponse({ response: res }, () => {

    return {
      message: 'admin dashbaord'
    }

  });

});
