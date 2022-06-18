import { NextPage } from 'next';
import { ChangeEvent, ReactNode } from 'react';
import { useAppDispatch, useForm } from '@/app/hooks';
import config from '@config';
import AlertStatus from '@misc/AlertStatus';
import { setError, setSuccess } from '@/features/alertSlice';

type Props = {
  children: ReactNode;
  model: string;
  id: number;
  options?: object;
};

const UpdateModelForm: NextPage<Props> = ({
  children,
  model,
  id,
  options = {},
}: Props) => {
  const handleUpdate = useForm({
    url: config.api.admin.update(`${model.toLowerCase()}s`, id),
    method: 'PATCH',
    ...options,
  });
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    const { code, message } = await handleUpdate(e);
    if (code === 200) {
      dispatch(setSuccess({ success: message }));
    } else {
      dispatch(setError({ error: message }));
    }
  };

  return (
    <form method="POST" onSubmit={handleOnSubmit}>
      <AlertStatus />

      {children}

      <div className="field">
        <input type="submit" value="Update" className="btn btn--primary" />
      </div>
    </form>
  );
};

export default UpdateModelForm;
