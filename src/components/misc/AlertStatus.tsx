import { NextPage } from 'next';
import { useEffect } from 'react';
import { clearAlert } from '@/features/alertSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const AlertStatus: NextPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.alert.error);
  const success = useAppSelector((state) => state.alert.success);

  useEffect(() => {
    const timer = setTimeout(() => void dispatch(clearAlert()), 5000);
    return () => void clearTimeout(timer);
  }, [dispatch, error, success]);

  return (
    <div className="alert-status">
      <span className="alert alert--error">
        {!Array.isArray(error)
          ? error
          : error.map((err, i) => (
              <span className="block" key={i}>
                {err}
              </span>
            ))}
      </span>
      <span className="alert alert--success">{success}</span>
    </div>
  );
};

export default AlertStatus;
