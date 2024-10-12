import { NextPage } from 'next';
import { faq } from '@/models/faq';
import { Faq } from '@prisma/client';
import NoDataFound from '@misc/NoDataFound';
import SingleFAQ from '@comp/front-page/SingleFAQ';
import CustomDirective from '@/modules/CustomDirectives/CustomDirective';

type Props = {
  faqs: Faq[];
};

const FaqPage: NextPage<Props> = ({ faqs }: Props) => (
  <main className="page faq">
    <h2 className="title">Frequently Asked Questions</h2>

    <p>
      Here is a list of questions that you may have about the website or what
      are the reasons behind my choices. So, let me know if you have any other
      questions. I will try to add new ones in the future.
    </p>
    <p>
      You can always try running this website locally and checkout the source
      code in the github repository.
    </p>

    <div className="list w-full">
      {faqs.length > 0 ? (
        faqs.map((f) => <SingleFAQ {...f} key={f.id} />)
      ) : (
        <NoDataFound />
      )}
    </div>
  </main>
);

export async function getServerSideProps() {
  const rawFaqs = await faq.all({
    orderBy: [{ priority: 'desc' }, { title: 'asc' }],
  });

  const faqs = rawFaqs.map((f) => ({
    ...f,
    content: CustomDirective(f.content),
  }));

  return {
    props: {
      faqs,
    },
  };
}

export default FaqPage;
