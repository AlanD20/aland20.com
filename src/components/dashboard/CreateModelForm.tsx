import { NextPage } from 'next';
import { ChangeEvent, ReactNode } from 'react';
import { useAppDispatch, useFetchForm } from '@/config/hooks';
import config from '@/config/app';
import AlertStatus from '@misc/AlertStatus';
import { setError, setSuccess } from '@/features/alertSlice';

type Props = {
  children: ReactNode;
  model: string;
  options?: object;
};

const CreateModelForm: NextPage<Props> = ({
  children,
  model,
  options = {},
}: Props) => {
  const dispatch = useAppDispatch();
  const handleCreate = useFetchForm(
    {
      url: config.api.admin.store(`${model.toLowerCase()}s`),
      method: 'POST',
    },
    { ...options }
  );

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    const { code, message, errors } = await handleCreate(e);

    if (code === 200) {
      dispatch(setSuccess({ success: message }));
    } else {
      dispatch(
        setError({
          error: Array.isArray(errors) ? errors : message,
        })
      );
    }
  };

  return (
    <form method="POST" onSubmit={handleOnSubmit}>
      <AlertStatus />

      {children}

      <div className="field">
        <input type="submit" value="Create" className="btn btn--primary" />
      </div>
    </form>
  );
};

export default CreateModelForm;
