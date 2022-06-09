import formInputsToObj from '@/helpers/formInputsToObj';
import axios from '@/app/axios';
import type { ChangeEvent } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


interface FetchWithForm {
  url?: string;
  method?: string;
  defaults?: object;
  parseOnly?: boolean;
  requestOnly?: boolean;
};

export const useForm = ({
  url,
  method = 'POST',
  defaults = {}
}: FetchWithForm) =>
  async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    const children = Array.from(form.elements) as HTMLInputElement[]
    const data = formInputsToObj(children, { defaults });

    form.reset();
    try {
      const resolved = await axios({ method, url, data });
      console.log({
        response: resolved.data,
        message: 'No, I didn\'t forget to remove this console log. This log gives more information about the response.'
      });

      return resolved.data;
    } catch (error: any) {
      return error.response.data;
    }

  }


