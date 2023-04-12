import nc from '@/config/nc';
import { sendResponse } from '@/config/validator';

// @ts-ignore
export default nc().get(async (req, res) => {
  sendResponse({ response: res }, () => ({
    message: 'admin dashbaord',
  }));
});
