import axios from '@/app/axios';
import nc from '@/app/nc'
import { validator } from '@/app/validator';
import SendMail, { ClientMail } from '@/modules/Mail/Mail';

export default nc().post(async (req, res) => {

  return await validator({
    body: req.body,
    response: res,
    model: 'contact'

  }, async (data) => {

    await validateEmail(data.email);

    await SendMail(ClientMail(data));

    return {
      message: 'Form has been submitted! I will try to respond as quickly as possible.'
    };
  });

});



async function validateEmail(email: string) {

  const validate = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);

  if (validate.data.deliverability !== 'DELIVERABLE')
    throw new Error('Provided Email is not reachable')

  if (validate.data.is_disposable_email.value)
    throw new Error('Disposable email are not allowed')

  if (!validate.data.is_valid_format.value)
    throw new Error('Incorrect email format')

  if (!validate.data.is_smtp_valid.value)
    throw new Error('Email address is invalid');

  if (!validate.data.is_mx_found.value)
    throw new Error('Please use a different email address')

}
