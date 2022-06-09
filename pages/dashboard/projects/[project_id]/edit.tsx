import { NextPage, NextPageContext } from 'next'
import { Project, Tag } from '@prisma/client';
import { project } from '@/models/project';
import BodyHeader from '@comp/dashboard/BodyHeader';
import { tag } from '@/models/tag';
import TagListSelection from '@misc/dashboard/TagListSelection';
import UpdateModelForm from '@comp/dashboard/UpdateModelForm';
import PriorityField from '@misc/dashboard/PriorityField';
import TextField from '@misc/dashboard/TextField';
import TextareaField from '@misc/dashboard/TextareaField';

type ProjectWithTags = Project & {
  tags: Tag[]
}

type Props = {
  project: ProjectWithTags,
  allTags: Tag[]
}

const EditProject: NextPage<Props> = ({
  project: {
    id, title, content, sourceLink, priority,
    previewLink, createdDate, completedDate, tags
  }, allTags
}: Props) => {

  const model = "Project"

  return (
    <main className="dashboard-page edit-page">
      <BodyHeader
        action="edit"
        model={model}
        url="projects"
        deleteBtn={id} />

      <UpdateModelForm model={model} id={id} >
        <TextField
          title="Title:"
          name="title"
          defaultValue={title} />
        <PriorityField defaultValue={priority} />
        <TextareaField
          title="Content:"
          name="content"
          defaultValue={content} />
        <TextField
          title="Source Code Link:"
          name="sourceLink"
          type='url'
          defaultValue={sourceLink} />
        <TextField
          title="Preview Link:"
          name="previewLink"
          type='url'
          defaultValue={previewLink}
          required={false} />
        <TextField
          type="date"
          title="Created Date:"
          name="createdDate"
          defaultValue={createdDate?.toString()} />
        <TextField
          type="date"
          title="Completed Date:"
          name="completedDate"
          defaultValue={completedDate?.toString()}
          required={false} />

        <TagListSelection
          tags={allTags}
          defaultTags={[...tags.map(t => t.id)]}
        />
      </UpdateModelForm>

    </main >
  )
}


export async function getServerSideProps(ctx: NextPageContext) {

  const id = Number(ctx.query.project_id);
  return {
    props: {
      project: await project.show(id, {
        include: {
          tags: true
        }
      }),
      allTags: await tag.all()
    }
  }
}

export default EditProject
