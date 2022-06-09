import { NextPage, NextPageContext } from 'next'
import { faq } from '@/models/faq';
import { Faq } from '@prisma/client';
import BodyHeader from '@comp/dashboard/BodyHeader';
import UpdateModelForm from '@comp/dashboard/UpdateModelForm';
import TextField from '@misc/dashboard/TextField';
import PriorityField from '@misc/dashboard/PriorityField';
import TextareaField from '@misc/dashboard/TextareaField';

type Props = {
  faq: Faq
}

const EditFaq: NextPage<Props> = ({
  faq: { id, title, priority, content }
}: Props) => {

  const model = 'FAQ';

  return (
    <main className="dashboard-page edit-page">
      <BodyHeader
        action="edit"
        model={model}
        url="faqs"
        deleteBtn={id} />

      <UpdateModelForm model={model} id={id}>
        <TextField
          title="Title:"
          name="title"
          defaultValue={title} />
        <PriorityField defaultValue={priority} />
        <TextareaField
          title="Content:"
          name="content"
          defaultValue={content} />
      </UpdateModelForm>
    </main >
  )
}


export async function getServerSideProps(ctx: NextPageContext) {

  const id = Number(ctx.query.faq_id);

  return {
    props: {
      faq: await faq.show(id)
    }
  }
}

export default EditFaq
