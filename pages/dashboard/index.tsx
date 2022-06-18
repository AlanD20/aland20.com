import { NextPage } from 'next';
import Link from 'next/link';

const Dashboard: NextPage = () => (
  <main className="page">
    <h2 className="title">Website Dashboard</h2>
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
    </div>
  </main>
);

export default Dashboard;
