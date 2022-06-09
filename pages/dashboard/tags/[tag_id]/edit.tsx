import { NextPage, NextPageContext } from 'next'
import { Tag } from '@prisma/client';
import { tag } from '@/models/tag';
import BodyHeader from '@comp/dashboard/BodyHeader';
import TextField from '@misc/dashboard/TextField';
import UpdateModelForm from '@comp/dashboard/UpdateModelForm';

type Props = {
  tag: Tag
}

const EditTag: NextPage<Props> = ({
  tag: { id, name }
}: Props) => {

  const model = "tag"

  return (
    <main className="dashboard-page edit-page">
      <BodyHeader
        action="edit"
        name={name}
        model={model}
        url="tags"
        deleteBtn={id} />


      <UpdateModelForm model={model} id={id}>
        <TextField
          title="Name:"
          name="name"
          defaultValue={name} />
      </UpdateModelForm>
    </main >
  )
}


export async function getServerSideProps(ctx: NextPageContext) {

  const id = Number(ctx.query.tag_id);

  return {
    props: {
      tag: await tag.show(id)
    }
  }
}

export default EditTag
