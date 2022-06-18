import { NextPage, NextPageContext } from 'next';
import { Skill, Tag } from '@prisma/client';
import { skill } from '@/models/skill';
import BodyHeader from '@comp/dashboard/BodyHeader';
import { tag } from '@/models/tag';
import UpdateModelForm from '@comp/dashboard/UpdateModelForm';
import PriorityField from '@misc/dashboard/PriorityField';
import TextField from '@misc/dashboard/TextField';
import TagListSelection from '@misc/dashboard/TagListSelection';

type SkillWithTags = Skill & {
  tags: Tag[];
};

type Props = {
  skill: SkillWithTags;
  allTags: Tag[];
};

const EditSkill: NextPage<Props> = ({
  skill: { id, title, priority, tags },
  allTags,
}: Props) => {
  const model = 'skill';

  return (
    <main className="dashboard-page edit-page">
      <BodyHeader action="edit" model={model} url="skills" deleteBtn={id} />

      <UpdateModelForm model={model} id={id}>
        <TextField title="Title:" name="title" defaultValue={title} />
        <PriorityField defaultValue={priority} />
        <TagListSelection
          tags={allTags}
          defaultTags={[...tags.map((t) => t.id)]}
        />
      </UpdateModelForm>
    </main>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const id = Number(ctx.query.skill_id);
  return {
    props: {
      skill: await skill.show(id, {
        include: {
          tags: true,
        },
      }),
      allTags: await tag.all(),
    },
  };
}

export default EditSkill;
