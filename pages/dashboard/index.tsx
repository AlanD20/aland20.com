import { NextPage } from 'next';
import Link from 'next/link';

const Dashboard: NextPage = () => {


  return (
    <main className="page">
      <h1 className="title">Website Dashboard</h1>
      <div className="dashbaord">

        <Link href="/dashboard/tags">
          <button className='btn btn--outline btn--wide'>Manage Tags</button>
        </Link>

        <Link href="/dashboard/faqs">
          <button className='btn btn--outline btn--wide'>Manage FAQs</button>
        </Link>

        <Link href="/dashboard/skills">
          <button className='btn btn--outline btn--wide'>Manage Skills</button>
        </Link>

        <Link href="/dashboard/projects">
          <button className='btn btn--outline btn--wide'>Manage Projects</button>
        </Link>

        <Link href="/dashboard/directives">
          <button className='btn btn--secondary'>Custom Directives</button>
        </Link>
      </div>

    </main>
  )
}


export default Dashboard
