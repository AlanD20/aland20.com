import { NextPage } from 'next';
import { Faq } from '@prisma/client';
import { faq } from '@/models/faq';
import SingleFaq from '@comp/dashboard/SingleFaq';
import BodyHeader from '@comp/dashboard/BodyHeader';
import ListModelCard from '@comp/dashboard/ListModelCard';
import highlightCustomDirectives from '@/modules/CustomDirectives/highlightCustomDirectives';

type Props = {
  faqs: Faq[];
};

const ManageFaqs: NextPage<Props> = ({ faqs }: Props) => (
  <main className="dashboard-page">
    <BodyHeader action="manage" model="FAQ" createBtn />

    <ListModelCard>
      {faqs.map((f) => (
        <SingleFaq {...f} key={f.id} />
      ))}
    </ListModelCard>
  </main>
);

export async function getServerSideProps() {
  const rawFaqs = await await faq.all({
    orderBy: [{ priority: 'desc' }, { title: 'asc' }],
  });
  const faqs = rawFaqs.map((p) => ({
    ...p,
    content: highlightCustomDirectives(p.content),
  }));

  return {
    props: {
      faqs,
    },
  };
}

export default ManageFaqs;
