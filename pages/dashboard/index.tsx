import { useAppDispatch, useFetch } from '@/config/hooks';
import { setError, setSuccess } from '@/features/alertSlice';
import config from '@/config/app';
import AlertStatus from '@misc/AlertStatus';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent } from 'react';

const Dashboard: NextPage = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();

  const handleExports = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { code, message } = await fetchRequest({
      url: config.api.admin.export(),
      method: 'POST',
    });

    if (code === 200) {
      dispatch(setSuccess({ success: message }));
    } else {
      dispatch(setError({ error: message }));
    }
  };
  return (
    <main className="page">
      <h2 className="title">Website Dashboard</h2>
      <AlertStatus />
      <div className="dashbaord">
        <Link className="btn btn--outline btn--wide" href="/dashboard/tags">
          Manage Tags
        </Link>

        <Link className="btn btn--outline btn--wide" href="/dashboard/faqs">
          Manage FAQs
        </Link>

        <Link className="btn btn--outline btn--wide" href="/dashboard/skills">
          Manage Skills
        </Link>

        <Link className="btn btn--outline btn--wide" href="/dashboard/projects">
          Manage Projects
        </Link>

        <Link className="btn btn--secondary" href="/dashboard/directives">
          Custom Directives
        </Link>

        <form method="post" onSubmit={handleExports}>
          <button type="submit" className="w-full btn btn--secondary">
            Export Database
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;
