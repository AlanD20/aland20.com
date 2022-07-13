import { useAppDispatch, useFetch } from '@/app/hooks';
import { setError, setSuccess } from '@/features/alertSlice';
import config from '@config';
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
        <Link href="/dashboard/tags">
          <button type="button" className="btn btn--outline btn--wide">
            Manage Tags
          </button>
        </Link>

        <Link href="/dashboard/faqs">
          <button type="button" className="btn btn--outline btn--wide">
            Manage FAQs
          </button>
        </Link>

        <Link href="/dashboard/skills">
          <button type="button" className="btn btn--outline btn--wide">
            Manage Skills
          </button>
        </Link>

        <Link href="/dashboard/projects">
          <button type="button" className="btn btn--outline btn--wide">
            Manage Projects
          </button>
        </Link>

        <Link href="/dashboard/directives">
          <button type="button" className="btn btn--secondary">
            Custom Directives
          </button>
        </Link>

        <form method="post" onSubmit={handleExports}>
          <button type="submit" className="btn btn--secondary w-full">
            Export Database
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;
