import { NextPage } from 'next'
import BodyHeader from '@comp/dashboard/BodyHeader'
import { tag } from '@/models/tag'
import { Tag } from '@prisma/client'
import CreateModelForm from '@comp/dashboard/CreateModelForm'
import PriorityField from '@misc/dashboard/PriorityField'
import TagListSelection from '@misc/dashboard/TagListSelection'
import TextareaField from '@misc/dashboard/TextareaField'
import TextField from '@misc/dashboard/TextField'

type Props = {
  tags: Tag[]
}

const CreateProject: NextPage<Props> = ({ tags }: Props) => {

  const model = 'Project';

  return (
    <main className="dashboard-page">
      <BodyHeader
        action="Create"
        model="Project"
        url="projects" />

      <CreateModelForm model={model}>
        <TextField title="Title:" name="title" />
        <PriorityField />
        <TextareaField title="Content:" name="content" />

        <TextField title="Source Code Link:" name="sourceLink" type='url' />

        <TextField title="Preview Link:" name="previewLink" type='url' />
        <TextField
          type="date"
          title="Created Date:"
          name="createdDate"
          required={false} />
        <TextField
          type="date"
          title="Completed Date:"
          name="completedDate"
          required={false} />

        <TagListSelection tags={tags} />

      </CreateModelForm>
    </main>
  )
}


// Enabling SSR to enable sesison for API request.
export async function getServerSideProps() {


  return {
    props: {
      tags: await tag.all()
    }
  }
}

export default CreateProject
