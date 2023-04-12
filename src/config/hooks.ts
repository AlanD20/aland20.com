import formInputsToObj from '@/helpers/formInputsToObj';
import axios from '@/config/axios';
import type { ChangeEvent } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface fetch {
  url: string;
  method?: string;
  data?: any;
}

interface FetchWithForm {
  defaults?: object;
  parseOnly?: boolean;
  requestOnly?: boolean;
}

export const useFetch =
  () =>
  async ({ url, method = 'GET', data = {} }: fetch) => {
    try {
      const resolved = await axios({ method, url, data });
      console.info({
        response: resolved.data,
        message:
          "No, I didn't forget to remove this console log. This log gives more information about the response.",
      });

      return resolved.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

export const useFetchForm = (
  { url, method = 'POST' }: fetch,
  { defaults = {}, requestOnly, parseOnly }: FetchWithForm = {}
) => {
  const fetchRequest = useFetch();

  return async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    let data = {};
    if (!requestOnly) {
      const children = Array.from(form.elements) as HTMLInputElement[];
      data = formInputsToObj(children, { defaults });
    }

    form.reset();
    if (parseOnly) return data;
    return fetchRequest({ url, method, data });
  };
};
