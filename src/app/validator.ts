import { NextApiResponse } from 'next';
import * as _ from 'yup';

interface ResponseApi {
  response: NextApiResponse<any>;
}

interface Validator extends ResponseApi {
  body: object;
  model: string;
}

export const NAME_VALIDATOR = _.string()
  .typeError('Name must be string')
  .matches(/^[aA-zZ\s-]+$/, 'Please enter valid name')
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters')
  .max(25, 'Name must not exceed 25 characters');

export const TITLE_VALIDATOR = _.string()
  .typeError('Title must be string')
  .required('Title is required')
  .min(3, 'Title must be at least 3 characters')
  .max(100, 'Title must not exceed 100 characters');

export const CONTENT_VALIDATOR = _.string()
  .typeError('Content must string')
  .required('Content is required')
  .max(2500, 'Content must not exceed 1000 characters');

export const PRIORITY_VALIDATOR = _.number()
  .typeError('Priority must be number')
  .required('Priority is required')
  .min(1, 'Priority has to be greater than 1')
  .max(100, 'Priority must not exceed 100');

export const LINK_VALIDATOR = _.string()
  .typeError('Link must be string')
  .required('Link is required')
  .url()
  .typeError('Link must be a URL');

export const RELATION_TAGS_VALIDATOR = _.string()
  .typeError('Tag must be array of strings')
  .required('Tag is required')
  .min(0, 'At least 1 tag has to be selected');

export const DATE_VALIDATOR = _.string().typeError(
  'Date must be a string date format'
);

export const Schema = {
  contact: _.object().shape({
    fullname: NAME_VALIDATOR,
    email: _.string()
      .typeError('Email is required')
      .required('Email is required')
      .email()
      .typeError('Invalid email format'),
    message: _.string()
      .typeError('Message is required')
      .required('Message is required')
      .max(1000, 'Message must not exceed 1000 characters'),
  }),
  tag: _.object().shape({
    name: NAME_VALIDATOR,
  }),
  project: _.object().shape({
    title: TITLE_VALIDATOR,
    content: CONTENT_VALIDATOR,
    sourceLink: LINK_VALIDATOR,
    previewLink: LINK_VALIDATOR,
    priority: PRIORITY_VALIDATOR,
    createdDate: DATE_VALIDATOR,
    completedDate: DATE_VALIDATOR,
    tags: RELATION_TAGS_VALIDATOR,
  }),
  faq: _.object().shape({
    title: TITLE_VALIDATOR,
    priority: PRIORITY_VALIDATOR,
    content: CONTENT_VALIDATOR,
  }),
  skill: _.object().shape({
    title: TITLE_VALIDATOR,
    priority: PRIORITY_VALIDATOR,
    tags: RELATION_TAGS_VALIDATOR,
  }),
};

export async function validator(
  { body, response, model }: Validator,
  func: Function
) {
  sendResponse({ response }, async () => {
    if (!Object.keys(Schema).includes(model)) {
      throw new Error('Schema is not defined!');
    }

    const validated = await Schema[model].camelCase().validate(body, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });

    return func(validated);
  });
}

export async function sendResponse({ response }: ResponseApi, func: Function) {
  try {
    const data = await func();

    return response.status(200).json({
      message: 'Successful',
      status: 'success',
      code: 200,
      ...data,
    });
  } catch (err) {
    return response.status(422).json({
      message: `${err}`,
      // @ts-ignore
      errors: err.errors as _.ValidationError,
      status: 'failed',
      code: 422,
    });
  }
}
