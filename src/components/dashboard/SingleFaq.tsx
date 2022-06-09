import SingleModelCard from '@comp/dashboard/SingleModelCard';
import TextBlock from '@misc/dashboard/TextBlock';
import { Faq } from '@prisma/client';
import { NextPage } from 'next'
import ParseHTMLToReactNode from 'html-react-parser';


const SingleFaq: NextPage<Faq> = ({ id, title, priority, content }: Faq) => {

  const model = 'FAQ';
  const parsed = ParseHTMLToReactNode(content);

  return (
    <SingleModelCard model={model} id={id}>

      <TextBlock title='Priority:' content={priority} inline />
      <TextBlock title='Title:' content={title} />
      {/* <TextBlock title='Content:' content={content} /> */}
      <TextBlock title='Content:' content={parsed} />

    </SingleModelCard>
  )
}

export default SingleFaq
