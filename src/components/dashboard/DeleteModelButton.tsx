import { useAppDispatch } from '@/app//hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import config from '@config';
import axios from '@/app/axios';
import { setError, setSuccess } from '@/features/alertSlice';


type Props = {
  model: string;
  id: number;
}

const DeleteModelButton: NextPage<Props> = ({ model, id }: Props) => {

  const router = useRouter();
  const dispatch = useAppDispatch();


  const handleDelete = async () => {

    try {
      const res = await axios({
        url: config.api.admin.destroy(`${model.toLowerCase()}s`, id),
        method: "DELETE"
      });

      const { message } = res.data;
      router.push(`/dashboard/${model.toLowerCase()}s`);

      dispatch(setSuccess({ success: message }))

    } catch (err: any) {
      const res = err?.response?.data
      const error = Array.isArray(res.errors) ?
        res.errors : res.message

      dispatch(setError({ error }))
    }

  }

  return (
    <button
      className="btn btn--primary btn--red"
      onClick={handleDelete}
    >
      🗑
    </button>
  )
}


export default DeleteModelButton
